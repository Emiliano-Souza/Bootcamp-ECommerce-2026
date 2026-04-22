<?php
namespace Bootcamp\CatalogApi\Model;

use Bootcamp\CatalogApi\Api\ProductListInterface;
use Magento\Catalog\Api\ProductRepositoryInterface;
use Magento\Framework\Api\SearchCriteriaBuilder;
use Magento\Store\Model\StoreManagerInterface;

class ProductList implements ProductListInterface
{
    private ProductRepositoryInterface $productRepository;
    private SearchCriteriaBuilder $searchCriteriaBuilder;
    private StoreManagerInterface $storeManager;

    public function __construct(
        ProductRepositoryInterface $productRepository,
        SearchCriteriaBuilder $searchCriteriaBuilder,
        StoreManagerInterface $storeManager
    ) {
        $this->productRepository = $productRepository;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->storeManager = $storeManager;
    }

    /**
     * @return array
     */
    public function getList()
    {
        $searchCriteria = $this->searchCriteriaBuilder
            ->addFilter('sku', 'BOOT-%', 'like')
            ->create();

        $products = $this->productRepository->getList($searchCriteria);
        $result = [];

        $mediaBaseUrl = $this->storeManager
            ->getStore()
            ->getBaseUrl(\Magento\Framework\UrlInterface::URL_TYPE_MEDIA);

        foreach ($products->getItems() as $product) {
            $techStack = '';
            if ($product->getCustomAttribute('tech_stack')) {
                $techStack = $product->getResource()
                    ->getAttribute('tech_stack')
                    ->getSource()
                    ->getOptionText($product->getCustomAttribute('tech_stack')->getValue());
            }

            $imageUrl = '';
            if ($product->getCustomAttribute('image')) {
                $imagePath = $product->getCustomAttribute('image')->getValue();
                if ($imagePath) {
                    $imageUrl = $mediaBaseUrl . 'catalog/product' . $imagePath;
                }
            }

            $result[] = [
                'sku' => $product->getSku(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'type' => $product->getTypeId(),
                'description' => $product->getCustomAttribute('short_description')
                    ? $product->getCustomAttribute('short_description')->getValue()
                    : '',
                'bootcamp_highlight' => $product->getCustomAttribute('bootcamp_highlight')
                    ? (bool) $product->getCustomAttribute('bootcamp_highlight')->getValue()
                    : false,
                'tech_stack' => $techStack,
                'image_url' => $imageUrl,
            ];
        }

        return $result;
    }
}
