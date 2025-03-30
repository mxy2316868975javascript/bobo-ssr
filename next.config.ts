import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // 配置持久化缓存，优化构建性能
  experimental: {
    // 启用持久化缓存
    turboTrace: {
      // 启用依赖分析，优化构建
      contextDirectory: ["."]
    },
    // 配置构建缓存
    outputFileTracingRoot: ".",
    // 启用增量构建
    incrementalCacheHandlerPath: require.resolve("next/dist/server/lib/incremental-cache/file-system-cache")
  },
  
  // 配置webpack缓存
  webpack: (config, { dev, isServer }) => {
    // 仅在生产构建时启用缓存
    if (!dev) {
      config.cache = {
        type: 'filesystem',
        version: `${process.env.NODE_ENV}-${process.env.npm_package_version}`,
        buildDependencies: {
          config: [__filename],
        },
        cacheDirectory: '.next/cache/webpack',
      };
      
      // 优化模块解析缓存
      config.infrastructureLogging = {
        level: 'error',
      };
    }
    
    return config;
  },
};

export default nextConfig;
