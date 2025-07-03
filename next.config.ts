import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
    webpack: (config) => {
        // Disable canvas and encoding modules (for @react-pdf-viewer)
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;

        // Important: return the modified config
        return config;
    },
    // Optional: If you need to ignore canvas during server-side rendering
    experimental: {
        serverComponentsExternalPackages: ['canvas'], // or ['@react-pdf-viewer/core']
    },
};

export default withNextIntl(nextConfig);