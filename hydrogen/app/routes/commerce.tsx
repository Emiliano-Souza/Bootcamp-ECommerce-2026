import type {Route} from './+types/commerce';

const COMMERCE_API_URLS = [
  'https://magento2.docker/rest/V1/bootcamp/catalog/products',
  'http://magento2.docker/rest/V1/bootcamp/catalog/products',
] as const;

type CommerceProduct = {
  name?: string;
  sku?: string;
  price?: number | string;
};

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

export async function loader(_args: Route.LoaderArgs) {
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

      return {
        source: endpoint,
        products: data,
        status: 'ok' as const,
      };
    } catch (error) {
      lastError =
        error instanceof Error
          ? new Error(`${endpoint} -> ${error.message}`)
          : new Error(`${endpoint} -> Falha ao consultar Commerce`);
    }
  }

  return {
    source: COMMERCE_API_URLS[0],
    products: [] as CommerceProduct[],
    status: 'error' as const,
    error: lastError?.message || 'Falha ao consultar Commerce',
  };
}

export default function Commerce({loaderData}: Route.ComponentProps) {
  const {products, source, status, error} = loaderData;

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Integracao com Adobe Commerce</h1>
        <p>
          Lista de produtos consumida em tempo real via REST para validar a
          conexao do bootcamp com o catalogo do Commerce.
        </p>
        <span>Fonte de dados: {source}</span>
      </section>

      <section className="about-products">
        <div className="about-products__header">
          <div>
            <p className="section-kicker">Adobe Commerce REST</p>
            <h2>Catalogo Integrado</h2>
          </div>
          <span className="about-source-badge">{status}</span>
        </div>

        {error ? <p className="dashboard-card__error">{error}</p> : null}

        {products.length > 0 ? (
          <div className="about-products__grid">
            {products.map((product, index) => (
              <article
                className="about-product-card"
                key={`${product.sku ?? 'produto'}-${index}`}
              >
                <div className="product-card__meta">
                  {product.sku ? (
                    <span className="product-card__badge">{product.sku}</span>
                  ) : null}
                  <span className="product-card__tech">Adobe Commerce</span>
                </div>
                <h3>{product.name || 'Produto sem nome'}</h3>
                <p className="about-product-card__description">
                  Produto sincronizado pelo endpoint REST do Commerce no
                  ambiente do bootcamp.
                </p>
                <strong>
                  {product.price !== undefined
                    ? `R$ ${Number(product.price).toFixed(2)}`
                    : 'Preco indisponivel'}
                </strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="about-empty-state">
            <h3>Nenhum produto retornado pelo Commerce</h3>
            <p>
              Verifique se a API do Adobe Commerce esta acessivel e se o
              endpoint do bootcamp possui produtos publicados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
