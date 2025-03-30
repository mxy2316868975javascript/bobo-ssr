import { NextResponse } from 'next/server';
import { BlogPostsData, BlogCategory } from '@/app/types';

// 模拟博客文章数据库
const blogPosts: BlogPostsData = {
  'tech': {
    'web-development': {
      'nextjs': {
        title: 'Next.js 15 新特性介绍1',
        content: '这是一篇关于Next.js 15新特性的详细介绍文章。Next.js 15带来了许多令人兴奋的新功能，包括改进的服务器组件、更快的构建时间和更好的开发体验。',
        date: '2023-10-26',
        author: '张三'
      },
      'react': {
        title: 'React 19 Hooks深入解析',
        content: '这篇文章深入探讨了React 19中的Hooks机制及其最佳实践。我们将分析useEffect、useState和自定义Hooks的高级用法。',
        date: '2023-09-15',
        author: '李四'
      }
    },
    'mobile': {
      'flutter': {
        title: 'Flutter应用性能优化指南',
        content: '本文提供了一系列Flutter应用性能优化的实用技巧，从布局优化到状态管理，帮助你构建流畅的跨平台应用。',
        date: '2023-08-10',
        author: '王五'
      }
    }
  },
  'design': {
    'ui': {
      title: 'UI设计趋势2023',
      content: '探索2023年最新的UI设计趋势，包括新拟态设计、微交互和响应式设计的最新发展。',
      date: '2023-07-20',
      author: '赵六'
    }
  }
};

// 获取所有博客分类和文章列表
export async function GET() {
  // 构建博客分类和文章列表
  const blogCategories: BlogCategory[] = [
    {
      category: 'tech',
      subcategories: [
        {
          name: 'web-development',
          posts: [
            { slug: ['tech', 'web-development', 'nextjs'], title: 'Next.js 15 新特性介绍' },
            { slug: ['tech', 'web-development', 'react'], title: 'React 19 Hooks深入解析' }
          ]
        },
        {
          name: 'mobile',
          posts: [
            { slug: ['tech', 'mobile', 'flutter'], title: 'Flutter应用性能优化指南' }
          ]
        }
      ]
    },
    {
      category: 'design',
      subcategories: [
        {
          name: 'ui',
          posts: [
            { slug: ['design', 'ui'], title: 'UI设计趋势2023' }
          ]
        }
      ]
    }
  ];

  return NextResponse.json(blogCategories);
}