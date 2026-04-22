<?php

declare(strict_types=1);

namespace Bootcamp\AemContent\Service;

use Bootcamp\AemContent\Model\Config;
use Magento\Framework\Exception\LocalizedException;
use Magento\Framework\HTTP\Client\Curl;
use Magento\Framework\Serialize\Serializer\Json;
use Psr\Log\LoggerInterface;

class BannerProvider
{
    private Config $config;
    private Curl $curl;
    private Json $json;
    private LoggerInterface $logger;

    public function __construct(
        Config $config,
        Curl $curl,
        Json $json,
        LoggerInterface $logger
    ) {
        $this->config = $config;
        $this->curl = $curl;
        $this->json = $json;
        $this->logger = $logger;
    }

    public function getBannerData(): ?array
    {
        if (!$this->config->isEnabled()) {
            return null;
        }

        $endpoint = $this->config->getEndpoint();
        if ($endpoint === '') {
            return $this->normalize($this->config->getFallbackData());
        }

        try {
            $this->curl->setTimeout($this->config->getRequestTimeout());
            $this->curl->addHeader('Accept', 'application/json');
            $this->curl->get($endpoint);

            if ($this->curl->getStatus() !== 200) {
                throw new LocalizedException(__('Unexpected AEM response status: %1', $this->curl->getStatus()));
            }

            $payload = $this->json->unserialize($this->curl->getBody());
            if (!is_array($payload)) {
                throw new LocalizedException(__('AEM response is not a valid JSON object.'));
            }

            $normalized = $this->normalize($payload);

            return $normalized['title'] !== '' ? $normalized : $this->normalize($this->config->getFallbackData());
        } catch (\Throwable $exception) {
            $this->logger->warning(
                'Unable to load Bootcamp AEM banner.',
                [
                    'endpoint' => $endpoint,
                    'exception' => $exception,
                ]
            );

            $fallback = $this->normalize($this->config->getFallbackData());

            return $fallback['title'] !== '' ? $fallback : null;
        }
    }

    private function normalize(array $payload): array
    {
        $title = $this->pickString($payload, ['title', 'headline', 'bannerTitle', 'name']);
        $description = $this->pickString($payload, ['description', 'subtitle', 'text', 'bannerDescription']);
        $ctaLabel = $this->pickString($payload, ['cta_label', 'ctaLabel', 'buttonLabel', 'linkLabel']);
        $ctaUrl = $this->pickString($payload, ['cta_url', 'ctaUrl', 'buttonUrl', 'linkUrl', 'url']);
        $imageUrl = $this->pickString($payload, ['image_url', 'imageUrl', 'image', 'backgroundImage']);
        $eyebrow = $this->pickString($payload, ['eyebrow', 'tag', 'kicker']);

        return [
            'title' => $title,
            'description' => $description,
            'cta_label' => $ctaLabel,
            'cta_url' => $ctaUrl !== '' ? $ctaUrl : '#',
            'image_url' => $imageUrl,
            'eyebrow' => $eyebrow,
        ];
    }

    private function pickString(array $payload, array $keys): string
    {
        foreach ($keys as $key) {
            if (!array_key_exists($key, $payload)) {
                continue;
            }

            $value = $payload[$key];
            if (is_scalar($value)) {
                return trim((string) $value);
            }
        }

        return '';
    }
}
