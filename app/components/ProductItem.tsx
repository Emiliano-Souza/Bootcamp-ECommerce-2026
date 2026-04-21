import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';

type ProductCardMetafield = {
  value?: string | null;
} | null;

type ProductCardProduct = {
  id: string;
  title: string;
  handle: string;
  featuredImage?: {
    id?: string | null;
    url: string;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  techStack?: ProductCardMetafield;
  highlightBadge?: ProductCardMetafield;
};

export function ProductItem({
  product,
  loading,
}: {
  product: ProductCardProduct;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;
  const techStack = product.techStack?.value;
  const highlightBadge = product.highlightBadge?.value;
  return (
    <Link
      className="product-item"
      key={product.id}
      prefetch="intent"
      to={variantUrl}
    >
      {image && (
        <Image
          alt={image.altText || product.title}
          aspectRatio="1/1"
          data={image}
          loading={loading}
          sizes="(min-width: 45em) 400px, 100vw"
        />
      )}
      <div className="product-card__content">
        <div className="product-card__meta">
          {highlightBadge ? (
            <span className="product-card__badge">{highlightBadge}</span>
          ) : null}
          {techStack ? (
            <span className="product-card__tech">{techStack}</span>
          ) : null}
        </div>
        <h4>{product.title}</h4>
        <small>
          <Money data={product.priceRange.minVariantPrice as any} />
        </small>
      </div>
    </Link>
  );
}
