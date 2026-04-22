<?php

declare(strict_types=1);

namespace Bootcamp\CatalogApi\Setup\Patch\Data;

use Magento\Catalog\Model\Product;
use Magento\Catalog\Setup\CategorySetupFactory;
use Magento\Eav\Model\Entity\Attribute\ScopedAttributeInterface;
use Magento\Eav\Model\Entity\Attribute\Source\Boolean;
use Magento\Framework\Setup\ModuleDataSetupInterface;
use Magento\Framework\Setup\Patch\DataPatchInterface;
use Magento\Framework\Setup\Patch\PatchRevertableInterface;

class AddBootcampProductAttributes implements DataPatchInterface, PatchRevertableInterface
{
    private ModuleDataSetupInterface $moduleDataSetup;
    private CategorySetupFactory $categorySetupFactory;

    public function __construct(
        ModuleDataSetupInterface $moduleDataSetup,
        CategorySetupFactory $categorySetupFactory
    ) {
        $this->moduleDataSetup = $moduleDataSetup;
        $this->categorySetupFactory = $categorySetupFactory;
    }

    public function apply()
    {
        $this->moduleDataSetup->getConnection()->startSetup();

        $categorySetup = $this->categorySetupFactory->create(['setup' => $this->moduleDataSetup]);

        if (!$categorySetup->getAttributeId(Product::ENTITY, 'bootcamp_highlight')) {
            $categorySetup->addAttribute(
                Product::ENTITY,
                'bootcamp_highlight',
                [
                    'type' => 'int',
                    'label' => 'Bootcamp Highlight',
                    'input' => 'boolean',
                    'source' => Boolean::class,
                    'required' => false,
                    'sort_order' => 110,
                    'global' => ScopedAttributeInterface::SCOPE_STORE,
                    'default' => 0,
                    'visible' => true,
                    'user_defined' => true,
                    'searchable' => false,
                    'filterable' => true,
                    'comparable' => false,
                    'visible_on_front' => true,
                    'used_in_product_listing' => true,
                    'group' => 'General',
                ]
            );
        }

        if (!$categorySetup->getAttributeId(Product::ENTITY, 'tech_stack')) {
            $categorySetup->addAttribute(
                Product::ENTITY,
                'tech_stack',
                [
                    'type' => 'int',
                    'label' => 'Tech Stack',
                    'input' => 'select',
                    'required' => false,
                    'sort_order' => 120,
                    'global' => ScopedAttributeInterface::SCOPE_STORE,
                    'visible' => true,
                    'user_defined' => true,
                    'searchable' => false,
                    'filterable' => true,
                    'comparable' => false,
                    'visible_on_front' => true,
                    'used_in_product_listing' => true,
                    'group' => 'General',
                    'option' => [
                        'values' => [
                            'Adobe Commerce',
                            'Adobe Experience Manager',
                            'Shopify',
                            'Hydrogen',
                            'Composable Commerce',
                        ],
                    ],
                ]
            );
        }

        $this->moduleDataSetup->getConnection()->endSetup();
    }

    public function revert()
    {
        $this->moduleDataSetup->getConnection()->startSetup();

        $categorySetup = $this->categorySetupFactory->create(['setup' => $this->moduleDataSetup]);

        $categorySetup->removeAttribute(Product::ENTITY, 'bootcamp_highlight');
        $categorySetup->removeAttribute(Product::ENTITY, 'tech_stack');

        $this->moduleDataSetup->getConnection()->endSetup();
    }

    public static function getDependencies(): array
    {
        return [];
    }

    public function getAliases(): array
    {
        return [];
    }
}
