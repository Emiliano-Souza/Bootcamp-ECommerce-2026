import type {Route} from './+types/dashboard';

const AEM_GRAPHQL_URL =
  'http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json';
const COMMERCE_API_URLS = [
  'https://magento2.docker/rest/V1/bootcamp/catalog/products',
  'http://magento2.docker/rest/V1/bootcamp/catalog/products',
] as const;
const AEM_AUTH = btoa('admin:admin');
const WATER_BOTTLE_NAME = 'garrafa termica dev';

type DashboardProduct = {
  name: string;
  meta?: string;
  price?: string;
};

type PlatformResult = {
  status: 'ok' | 'error';
  count: number;
  endpoint: string;
  apiType: string;
  products: DashboardProduct[];
  waterBottleFound: boolean;
  error?: string;
};

type CommerceProduct = {
  name?: string;
  sku?: string;
  price?: number | string;
};

type AemProduct = {
  titulo?: string;
  categoria?: string;
  preco?: number;
};

type ShopifyProduct = {
  title: string;
  handle: string;
};

function normalizeLabel(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function decodeXmlValue(value: string) {
  return value
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractXmlTag(block: string, tagName: string) {
  const match = block.match(new RegExp(`<${tagName}>([\\s\\S]*?)</${tagName}>`));
  return match ? decodeXmlValue(match[1].trim()) : '';
}

function parseCommerceXml(xml: string): CommerceProduct[] {
  const itemMatches = xml.match(/<item>[\s\S]*?<\/item>/g) || [];

  return itemMatches.map((item) => ({
    sku: extractXmlTag(item, 'sku'),
    name: extractXmlTag(item, 'name'),
    price: extractXmlTag(item, 'price'),
  }));
}

export async function loader({context}: Route.LoaderArgs) {
  const [commerceResult, aemResult, shopifyResult] = await Promise.allSettled([
    fetchCommerce(),
    fetchAem(),
    fetchShopify(context),
  ]);

  return {
    commerce:
      commerceResult.status === 'fulfilled'
        ? commerceResult.value
        : buildErrorResult('REST', COMMERCE_API_URLS[0], commerceResult.reason),
    aem:
      aemResult.status === 'fulfilled'
        ? aemResult.value
        : buildErrorResult('GraphQL', AEM_GRAPHQL_URL, aemResult.reason),
    shopify:
      shopifyResult.status === 'fulfilled'
        ? shopifyResult.value
        : buildErrorResult(
            'Storefront API',
            'Shopify Storefront API',
            shopifyResult.reason,
          ),
  };
}

function buildErrorResult(
  apiType: string,
  endpoint: string,
  reason: unknown,
): PlatformResult {
  const message =
    reason instanceof Error ? reason.message : 'Falha ao consultar a plataforma';

  return {
    status: 'error',
    count: 0,
    endpoint,
    apiType,
    products: [],
    waterBottleFound: false,
    error: message,
  };
}

async function fetchCommerce(): Promise<PlatformResult> {
  let lastError: Error | null = null;

  for (const endpoint of COMMERCE_API_URLS) {
    try {
      const response = await fetch(endpoint, {
        headers: {
          Accept:
            'application/json, text/xml;q=0.9, application/xml;q=0.8, */*;q=0.5',
        },
      });
      if (!response.ok) {
        throw new Error(`Commerce respondeu ${response.status}`);
      }

      const responseText = await response.text();
      const trimmedResponse = responseText.trim();
      const data = trimmedResponse.startsWith('<')
        ? parseCommerceXml(trimmedResponse)
        : ((JSON.parse(trimmedResponse) as CommerceProduct[]) || []);

      if (!data.length) {
        throw new Error(
          'Commerce nao retornou produtos em um formato reconhecido',
        );
      }

      const products = data.map((product) => ({
        name: product.name || 'Produto sem nome',
        meta: product.sku || 'Sem SKU',
        price:
          product.price !== undefined
            ? `R$ ${Number(product.price).toFixed(2)}`
            : '',
      }));

      return {
        status: 'ok',
        count: products.length,
        endpoint,
        apiType: 'REST',
        products,
        waterBottleFound: products.some(
          (product) => normalizeLabel(product.name) === WATER_BOTTLE_NAME,
        ),
      };
    } catch (error) {
      lastError =
        error instanceof Error
          ? new Error(`${endpoint} -> ${error.message}`)
          : new Error(`${endpoint} -> Falha ao consultar Commerce`);
    }
  }

  throw lastError || new Error('Falha ao consultar Commerce');
}

async function fetchAem(): Promise<PlatformResult> {
  const response = await fetch(AEM_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${AEM_AUTH}`,
    },
    body: JSON.stringify({
      query: `{
        produtoDestaqueList: produtodestaqueList {
          items {
            titulo
            preco
            categoria
          }
        }
      }`,
    }),
  });

  if (!response.ok) throw new Error(`AEM respondeu ${response.status}`);

  const data = (await response.json()) as {
    data?: {
      produtoDestaqueList?: {
        items?: AemProduct[];
      };
    };
  };
  const items = data.data?.produtoDestaqueList?.items || [];
  const products = items.map((item) => ({
    name: item.titulo || 'Fragmento sem titulo',
    meta: item.categoria || 'Sem categoria',
    price: item.preco !== undefined ? `R$ ${Number(item.preco).toFixed(2)}` : '',
  }));

  return {
    status: 'ok',
    count: products.length,
    endpoint: AEM_GRAPHQL_URL,
    apiType: 'GraphQL',
    products,
    waterBottleFound: products.some(
      (product) => normalizeLabel(product.name) === WATER_BOTTLE_NAME,
    ),
  };
}

async function fetchShopify(
  context: Route.LoaderArgs['context'],
): Promise<PlatformResult> {
  const data = await context.storefront.query<{
    products: {nodes: ShopifyProduct[]};
  }>(`#graphql
    query DashboardProducts($country: CountryCode, $language: LanguageCode)
      @inContext(country: $country, language: $language) {
      products(first: 10, sortKey: UPDATED_AT, reverse: true) {
        nodes {
          title
          handle
        }
      }
    }
  `);

  const products = data.products.nodes.map((product) => ({
    name: product.title,
    meta: product.handle,
  }));

  return {
    status: 'ok',
    count: products.length,
    endpoint: 'Shopify Storefront API',
    apiType: 'Storefront API',
    products,
    waterBottleFound: products.some(
      (product) => normalizeLabel(product.name) === WATER_BOTTLE_NAME,
    ),
  };
}

export default function Dashboard({loaderData}: Route.ComponentProps) {
  const platforms = [
    {
      key: 'commerce',
      title: 'Adobe Commerce',
      accentClass: 'dashboard-card--commerce',
      data: loaderData.commerce,
    },
    {
      key: 'aem',
      title: 'Adobe Experience Manager',
      accentClass: 'dashboard-card--aem',
      data: loaderData.aem,
    },
    {
      key: 'shopify',
      title: 'Shopify',
      accentClass: 'dashboard-card--shopify',
      data: loaderData.shopify,
    },
  ] as const;

  return (
    <div className="dashboard-page">
      <section className="dashboard-hero">
        <p className="section-kicker">Projeto Integrado</p>
        <h1>Dashboard de Integracao</h1>
        <p>
          Validacao central do desafio final com Adobe Commerce, AEM e Shopify
          lado a lado.
        </p>
      </section>

      <section className="dashboard-cards">
        {platforms.map((platform) => (
          <article
            className={`dashboard-card ${platform.accentClass}`}
            key={platform.key}
          >
            <div className="dashboard-card__header">
              <div>
                <p className="section-kicker">{platform.data.apiType}</p>
                <h2>{platform.title}</h2>
              </div>
              <span
                className={`dashboard-status dashboard-status--${platform.data.status}`}
              >
                {platform.data.status === 'ok'
                  ? `${platform.data.count} produtos`
                  : 'Offline'}
              </span>
            </div>
            <p className="dashboard-card__endpoint">{platform.data.endpoint}</p>
            <p className="dashboard-card__water-bottle">
              Garrafa Termica Dev:{' '}
              <strong>
                {platform.data.waterBottleFound ? 'encontrada' : 'nao encontrada'}
              </strong>
            </p>
            {platform.data.error ? (
              <p className="dashboard-card__error">{platform.data.error}</p>
            ) : null}
          </article>
        ))}
      </section>

      <section className="dashboard-tables">
        {platforms.map((platform) => (
          <section className="dashboard-table-card" key={`${platform.key}-table`}>
            <div className="dashboard-table-card__header">
              <h2>{platform.title}</h2>
              <span>{platform.data.count} itens</span>
            </div>

            {platform.data.products.length > 0 ? (
              <div className="dashboard-table-wrapper">
                <table className="dashboard-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Detalhe</th>
                      <th>Preco</th>
                    </tr>
                  </thead>
                  <tbody>
                    {platform.data.products.map((product) => (
                      <tr key={`${platform.key}-${product.name}-${product.meta}`}>
                        <td>{product.name}</td>
                        <td>{product.meta || '-'}</td>
                        <td>{product.price || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="dashboard-empty">
                Nenhum dado retornado por esta plataforma ainda.
              </p>
            )}
          </section>
        ))}
      </section>
    </div>
  );
}
