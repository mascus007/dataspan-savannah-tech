/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
          // To prevent AWS SDK from attempting to load browser-only dependencies during server-side rendering
          config.resolve.fallback = {
            ...config.resolve.fallback,
            dns: false,
            fs: false,
            net: false,
            tls: false,
          };
        }
    
        return config;
      },
};

export default nextConfig;
