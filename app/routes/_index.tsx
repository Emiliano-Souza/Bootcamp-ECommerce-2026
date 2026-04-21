import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import {MockShopNotice} from '~/components/MockShopNotice';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collection}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY, {
      variables: {handle: 'destaques'},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    isShopLinked: Boolean(context.env.PUBLIC_STORE_DOMAIN),
    featuredCollection: collection,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home bootcamp-home">
      {data.isShopLinked ? null : <MockShopNotice />}
      <HeroBanner />
      <FeaturedCollection collection={data.featuredCollection} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function HeroBanner() {
  return (
    <section className="hero-banner">
      <div className="hero-content">
        <span className="hero-eyebrow">Shopify Hydrogen Storefront</span>
        <h1>Bem Vindo ao Bootcamp Store</h1>
        <p>
          Uma vitrine headless feita com Hydrogen, Storefront API e metafields
          para destacar produtos para desenvolvedores.
        </p>
        <div className="hero-actions">
          <Link className="hero-button" to="/collections/destaques">
            Ver Produtos
          </Link>
          <Link className="hero-link" to="/commerce">
            Ver Integracao com Commerce
          </Link>
          <Link className="hero-link" to="/about">
            Ver Integracao com AEM
          </Link>
          <Link className="hero-link" to="/dashboard">
            Ver Dashboard
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment | null | undefined;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <section className="featured-products" aria-labelledby="featured-products">
      <div className="featured-products-header">
        <div>
          <p className="section-kicker">Colecao em destaque</p>
          <h2 id="featured-products">{collection.title}</h2>
        </div>
        <Link className="section-link" to={`/collections/${collection.handle}`}>
          Explorar colecao
        </Link>
      </div>
      {image && (
        <div className="featured-collection">
          <div className="featured-collection-image">
            <Image
              data={image}
              sizes="100vw"
              alt={image.altText || collection.title}
            />
          </div>
        </div>
      )}
      <div className="products-grid">
        {collection.products.nodes.map((product) => (
          <ProductItem key={product.id} product={product} loading="eager" />
        ))}
      </div>
    </section>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section
      className="recommended-products"
      aria-labelledby="recommended-products"
    >
      <div className="recommended-products-header">
        <div>
          <p className="section-kicker">Shopify Storefront API</p>
          <h2 id="recommended-products">Produtos Recomendados</h2>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <ProductItem key={product.id} product={product} />
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 8) {
      nodes {
        id
        title
        handle
        featuredImage {
          id
          url
          altText
          width
          height
        }
        priceRange {
          minVariantPrice {
            amount
            currencyCode
          }
        }
        techStack: metafield(namespace: "custom", key: "tech_stack") {
          value
        }
        highlightBadge: metafield(namespace: "custom", key: "highlight_badge") {
          value
        }
      }
    }
  }
  query FeaturedCollection(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
  )
    @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      ...FeaturedCollection
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
