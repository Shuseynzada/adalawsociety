import createNextIntPlugin from "next-intl/plugin"

const withNextInt = createNextIntPlugin()

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'firebasestorage.googleapis.com',
                pathname: '/v0/b/**',
            },
        ]
    }
};

export default withNextInt(nextConfig);
