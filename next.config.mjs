/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/bets',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'web-share=(self https://192.168.1.35:3001))',
          },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
