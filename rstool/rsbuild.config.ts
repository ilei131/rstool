// rsbuild.config.ts
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';
 
export default defineConfig({
    plugins: [pluginReact(), pluginLess()],
      // source 配置
    source: {
      // 配置路径别名
      alias: {
        '@': './',
      },
      // 入口文件配置
      entry: {
        index: './src/main.tsx',
      }
    },
      // 开发服务器配置
  server: {
    port: 1420, // Tauri 默认端口
  },
  // 构建工具配置
  tools: {
    rspack: {
      target: 'web'
    }
  },
  // HTML 配置
  html: {
    template: './index.html'
  },
  // 输出配置
  output: {
    distPath: {
      root: 'dist',
      js: 'assets/js',
      css: 'assets/css',
      image: 'assets/images',
    },
    cleanDistPath: true, // 构建前清空 dist 目录
  }
});