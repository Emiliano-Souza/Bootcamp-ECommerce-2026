<?php

declare(strict_types=1);

namespace Bootcamp\AemContent\Block;

use Bootcamp\AemContent\Service\BannerProvider;
use Magento\Framework\View\Element\Template;

class Banner extends Template
{
    private BannerProvider $bannerProvider;
    private ?array $banner = null;
    private bool $isBannerLoaded = false;

    public function __construct(
        Template\Context $context,
        BannerProvider $bannerProvider,
        array $data = []
    ) {
        parent::__construct($context, $data);
        $this->bannerProvider = $bannerProvider;
    }

    public function getBanner(): ?array
    {
        if (!$this->isBannerLoaded) {
            $this->banner = $this->bannerProvider->getBannerData();
            $this->isBannerLoaded = true;
        }

        return $this->banner;
    }

    public function canRender(): bool
    {
        $banner = $this->getBanner();

        return is_array($banner) && $banner['title'] !== '';
    }
}
