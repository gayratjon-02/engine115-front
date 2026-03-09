/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL,
    },
};

module.exports = nextConfig;
