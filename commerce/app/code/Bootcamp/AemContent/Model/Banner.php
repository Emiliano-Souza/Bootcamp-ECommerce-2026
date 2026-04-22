<?php

declare(strict_types=1);

namespace Bootcamp\AemContent\Model;

use Bootcamp\AemContent\Api\BannerInterface;
use Bootcamp\AemContent\Service\BannerProvider;

class Banner implements BannerInterface
{
    private Config $config;
    private BannerProvider $bannerProvider;

    public function __construct(
        Config $config,
        BannerProvider $bannerProvider
    ) {
        $this->config = $config;
        $this->bannerProvider = $bannerProvider;
    }

    public function get(): array
    {
        $banner = $this->bannerProvider->getBannerData();

        return [
            'enabled' => $this->config->isEnabled(),
            'title' => $banner['title'] ?? '',
            'description' => $banner['description'] ?? '',
            'cta_label' => $banner['cta_label'] ?? '',
            'cta_url' => $banner['cta_url'] ?? '',
            'image_url' => $banner['image_url'] ?? '',
            'eyebrow' => $banner['eyebrow'] ?? '',
        ];
    }
}
