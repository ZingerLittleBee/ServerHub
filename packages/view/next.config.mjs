/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",
  async rewrites() {
    const devServerPort = process.env.DEV_SERVER_PORT || 3001
    const devClientPort = process.env.DEV_CLIENT_PORT || 3002
    const defaultProdServerUrl = "https://server.serverhub.app"
    const defaultProdClientUrl = "https://client.serverhub.app"
    const isDev = process.env.NODE_ENV === "development"

    const serverUrl = process.env.SERVER_URL
      ? process.env.SERVER_URL
      : isDev
      ? `http://localhost:${devServerPort}`
      : defaultProdServerUrl

    const clientUrl = process.env.CLIENT_URL
      ? process.env.CLIENT_URL
      : isDev
      ? `http://localhost:${devClientPort}`
      : defaultProdClientUrl

    return [
      {
        source: "/api/s/:path*",
        destination: `${serverUrl}/:path*`,
      },
      {
        source: "/api/c/:path*",
        destination: `${clientUrl}/:path*`,
      },
    ]
  },
}

export default nextConfig
