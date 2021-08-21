/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  async redirects() {
    return [{ source: "/", destination: "/challenges", permanent: true }];
  },
  serverRuntimeConfig: {
    PROJECT_ROOT: __dirname,
    API_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
