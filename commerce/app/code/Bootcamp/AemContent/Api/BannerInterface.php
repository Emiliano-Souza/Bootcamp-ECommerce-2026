<?php

declare(strict_types=1);

namespace Bootcamp\AemContent\Api;

interface BannerInterface
{
    /**
     * Return the homepage banner payload for headless clients.
     *
     * @return array
     */
    public function get(): array;
}
