<?php

declare(strict_types=1);

namespace Bootcamp\AemContent\Model;

use Magento\Framework\App\Config\ScopeConfigInterface;
use Magento\Store\Model\ScopeInterface;

class Config
{
    private const XML_PATH_ENABLED = 'bootcamp_aem/banner/enabled';
    private const XML_PATH_ENDPOINT = 'bootcamp_aem/banner/endpoint';
    private const XML_PATH_TIMEOUT = 'bootcamp_aem/banner/request_timeout';
    private const XML_PATH_TITLE = 'bootcamp_aem/banner/title';
    private const XML_PATH_DESCRIPTION = 'bootcamp_aem/banner/description';
    private const XML_PATH_CTA_LABEL = 'bootcamp_aem/banner/cta_label';
    private const XML_PATH_CTA_URL = 'bootcamp_aem/banner/cta_url';

    private ScopeConfigInterface $scopeConfig;

    public function __construct(ScopeConfigInterface $scopeConfig)
    {
        $this->scopeConfig = $scopeConfig;
    }

    public function isEnabled(): bool
    {
        return $this->scopeConfig->isSetFlag(self::XML_PATH_ENABLED, ScopeInterface::SCOPE_STORE);
    }

    public function getEndpoint(): string
    {
        return trim((string) $this->scopeConfig->getValue(self::XML_PATH_ENDPOINT, ScopeInterface::SCOPE_STORE));
    }

    public function getRequestTimeout(): int
    {
        $timeout = (int) $this->scopeConfig->getValue(self::XML_PATH_TIMEOUT, ScopeInterface::SCOPE_STORE);

        return $timeout > 0 ? $timeout : 5;
    }

    public function getFallbackData(): array
    {
        return [
            'title' => (string) $this->scopeConfig->getValue(self::XML_PATH_TITLE, ScopeInterface::SCOPE_STORE),
            'description' => (string) $this->scopeConfig->getValue(self::XML_PATH_DESCRIPTION, ScopeInterface::SCOPE_STORE),
            'cta_label' => (string) $this->scopeConfig->getValue(self::XML_PATH_CTA_LABEL, ScopeInterface::SCOPE_STORE),
            'cta_url' => (string) $this->scopeConfig->getValue(self::XML_PATH_CTA_URL, ScopeInterface::SCOPE_STORE),
        ];
    }
}
