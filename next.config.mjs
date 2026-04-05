/** @type {import('next').NextConfig} */
const nextConfig = {
    devIndicators: {
        buildActivity: false,
        appIsrStatus: false,
    },
    compiler: {
        removeConsole: process.env.NODE_ENV === "production" ? { exclude: ['error'] } : false,
    },
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; font-src 'self' data: https:; media-src 'self' https:; connect-src 'self' https:; frame-src 'self' https://www.youtube.com;",
                    }
                ],
            },
        ];
    },
};

export default nextConfig;
