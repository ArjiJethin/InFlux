/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_URL:
            process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
    },
    output: {
        tracingRoot: require("path").join(__dirname, "../../"),
    },
};

module.exports = nextConfig;
