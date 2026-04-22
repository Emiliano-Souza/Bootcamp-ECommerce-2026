import type {Route} from './+types/about';

const AEM_GRAPHQL_URL =
  'http://localhost:4502/content/cq:graphql/bootcamp-emiliano/endpoint.json';
const AEM_AUTH = btoa('admin:admin');

type AemProduct = {
  titulo?: string;
  descricao?: {html?: string};
  preco?: number;
  categoria?: string;
  stackTecnologico?: string;
};

type AemGraphQlResponse = {
  data?: {
    produtoDestaqueList?: {
      items?: AemProduct[];
    };
  };
};

export async function loader(_args: Route.LoaderArgs) {
  try {
    const response = await fetch(AEM_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${AEM_AUTH}`,
      },
      body: JSON.stringify({
        query: `{
          produtoDestaqueList: produtodestaqueList(
            filter: { destaque: { _expressions: [{ value: true }] } }
          ) {
            items {
              titulo
              descricao { html }
              preco
              categoria
              stackTecnologico: stacktecnologico
            }
          }
        }`,
      }),
    });

    const data = (await response.json()) as AemGraphQlResponse;

    return {
      products: (data.data?.produtoDestaqueList?.items || []) as AemProduct[],
      source: 'aem-live',
    };
  } catch (error) {
    console.error('Erro ao buscar AEM:', error);
    return {products: [] as AemProduct[], source: 'error'};
  }
}

export default function About({loaderData}: Route.ComponentProps) {
  const {products, source} = loaderData;

  return (
    <div className="about-page">
      <section className="about-hero">
        <h1>Sobre o Bootcamp 2026</h1>
        <p>
          Treinamento tecnico intensivo cobrindo Adobe Commerce, AEM e Shopify.
        </p>
        <span>Conteudo gerenciado via AEM ({source})</span>
      </section>

      <section className="about-products">
        <div className="about-products__header">
          <div>
            <p className="section-kicker">AEM GraphQL</p>
            <h2>Produtos em Destaque</h2>
          </div>
          <span className="about-source-badge">{source}</span>
        </div>

        {products.length > 0 ? (
          <div className="about-products__grid">
            {products.map((product: AemProduct, index: number) => (
              <article
                className="about-product-card"
                key={product.titulo ?? index}
              >
                <div className="product-card__meta">
                  {product.categoria ? (
                    <span className="product-card__badge">
                      {product.categoria}
                    </span>
                  ) : null}
                  {product.stackTecnologico ? (
                    <span className="product-card__tech">
                      {product.stackTecnologico}
                    </span>
                  ) : null}
                </div>
                <h3>{product.titulo}</h3>
                <div
                  className="about-product-card__description"
                  dangerouslySetInnerHTML={{
                    __html: product.descricao?.html || '',
                  }}
                />
                <strong>R$ {Number(product.preco || 0).toFixed(2)}</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="about-empty-state">
            <h3>Nenhum produto em destaque ainda</h3>
            <p>
              Crie ou publique o Content Fragment da Garrafa Termica Dev no AEM
              com o campo <code>destaque</code> marcado como verdadeiro.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
