'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Typography, Space, Breadcrumb, Card, Divider, Tag, Button } from 'antd';
import { UserOutlined, CalendarOutlined, HomeOutlined, ReadOutlined } from '@ant-design/icons';
import { BlogPostsData, BlogPost } from '@/app/types';

type BlogPageProps = {
  params: {
    slug: string[];
  };
};

const { Title, Paragraph, Text } = Typography;

// 模拟博客文章数据
const blogPosts: BlogPostsData = {
  'tech': {
    'web-development': {
      'nextjs': {
        title: 'Next.js 15 新特性介绍341',
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

// 根据路径参数获取博客文章
function getBlogPost(slugArray: string[]): BlogPost | null {
  let current: any = blogPosts;
  
  // 遍历路径参数，逐层深入对象
  for (const slug of slugArray) {
    if (current[slug]) {
      current = current[slug];
    } else {
      return null;
    }
  }
  
  // 检查是否找到了文章（具有title和content属性）
  if (current && current.title && current.content) {
    return current as BlogPost;
  }
  
  return null;
}

export default function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  const post = getBlogPost(slug);
  
  // 如果找不到文章，返回404
  if (!post) {
    notFound();
  }
  
  // 构建面包屑路径
  const breadcrumbItems = [
    { title: <Link href="/"><HomeOutlined /> 首页</Link> },
    { title: <Link href="/blog"><ReadOutlined /> 博客</Link> },
    ...slug.slice(0, -1).map((segment, index) => ({
      title: <Link href={`/blog/${slug.slice(0, index + 1).join('/')}`}>{segment}</Link>
    })),
    { title: post.title }
  ];
  
  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      
      <Title level={2}>{post.title}</Title>
      
      <Space split={<Divider type="vertical" />} style={{ marginBottom: 24 }}>
        <Text type="secondary"><UserOutlined /> {post.author}</Text>
        <Text type="secondary"><CalendarOutlined /> {post.date}</Text>
      </Space>
      
      <Card style={{ marginBottom: 24 }}>
        <Paragraph>{post.content}</Paragraph>
      </Card>
      
      <Space>
        <Button type="primary">
          <Link href="/blog">返回博客列表</Link>
        </Button>
        <Button>
          <Link href="/">返回首页</Link>
        </Button>
      </Space>
    </Card>
  );
}