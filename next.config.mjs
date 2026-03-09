/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        SERVER_API_URL: process.env.SERVER_API_URL || 'http://localhost:3000',
    },
};

export default nextConfig;
