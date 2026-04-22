<?php
namespace Bootcamp\CatalogApi\Api;

interface ProductListInterface
{
    /**
     * Get list of products
     *
     * @return array
     */
    public function getList();
}