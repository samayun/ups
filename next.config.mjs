import { createRequire } from 'module';
await import('./src/env.mjs');

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: {
  //     fullUrl: true,
  //   },
  // },
  cacheHandler:
    process.env.NODE_ENV === 'production'
      ? require.resolve('./cache-handler.mjs')
      : undefined,
  webpack: (config) => {
    config.externals.push('@node-rs/argon2', '@node-rs/bcrypt');
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['rizzui'],
    serverActions: {
      allowedOrigins: ['localhost:3001', '*.truebeep.com', 'truebeep.com'],
      bodySizeLimit: '5mb',
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  images: {
    remotePatterns: [
      'localhost',
      'https://lh3.googleusercontent.com',
      'lh3.googleusercontent.com',
      'https://via.placeholder.com',
      'lh3.googleusercontent.com',
      'https://d1oco4z2z1fhwp.cloudfront.net',
      `${process.env.BUCKET_NAME}.s3.amazonaws.com`,
      `${process.env.BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com`,
      'pub-6c8c50ef6ce34e30b96b53bd54fd8d10.r2.dev',
      'pub-4e34dcd3db9441139ca4a6b10fb5b937.r2.dev',
      'pub-dbc7a67a25d84d1789e2350116dde789.r2.dev',
      'pub-57cb018ef3404b4f94cd2491f5f1d4a8.r2.dev',
      'media.licdn.com',
      'prod.truebeepmedia.net',
      'stage.truebeepmedia.net',
      'imagedelivery.net',
      'truebeepmedia.net',
    ],

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd1oco4z2z1fhwp.cloudfront.net',
        pathname: '/templates/default/**',
      },
      {
        protocol: 'https',
        hostname: 'saaskit.s3.ap-southeast-1.amazonaws.com',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'truebeepdev.s3.us-east-1.amazonaws.com',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'document-export.canva.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'truebeepmedia.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.xx.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        pathname: '/redqteam.com/truebeep/asset/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_UPLOAD_URL}`,
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: `${process.env.NEXT_PUBLIC_IMAGE_DELIVERY_URL}`,
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-6c8c50ef6ce34e30b96b53bd54fd8d10.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-4e34dcd3db9441139ca4a6b10fb5b937.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imagedelivery.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-dbc7a67a25d84d1789e2350116dde789.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-57cb018ef3404b4f94cd2491f5f1d4a8.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'prod.truebeepmedia.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'stage.truebeepmedia.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.fbsbx.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.fbcdn.net',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'media1.giphy.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
