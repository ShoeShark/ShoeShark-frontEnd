// @ts-check
const autoImport = require('unplugin-auto-import/webpack').default;

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: config => {
        config.plugins.push(
            autoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                ],
                injectAtEnd: false,
                imports: [
                    'react',
                ],
            }),
        )
        config.resolve.fallback = { fs: false, net: false, tls: false };
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
    images: {
        domains: [
            'p.qqan.com',
            'img0.baidu.com',
        ]
    }
};

module.exports = nextConfig;
