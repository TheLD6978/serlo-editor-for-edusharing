/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // fixes problem with outdated react-dnd version
    // see https://github.com/react-dnd/react-dnd/issues/3433
    // can be removed if edtr is on react-dnd 16
    config.resolve.alias['react/jsx-runtime.js'] = 'react/jsx-runtime'
    config.resolve.alias['react/jsx-dev-runtime.js'] = 'react/jsx-dev-runtime'

    return config
  },
}

module.exports = nextConfig
