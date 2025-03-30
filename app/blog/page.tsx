'use client';

import Link from 'next/link';
import { Typography, Card, List, Space, Divider, Tag, Breadcrumb } from 'antd';
import { UserOutlined, CalendarOutlined, HomeOutlined, ReadOutlined, FolderOutlined } from '@ant-design/icons';
import { BlogCategory } from '@/app/types';

const { Title, Paragraph, Text } = Typography;

async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    // 在服务端组件中，fetch会自动使用相对路径
    const response = await fetch('http://localhost:3000/api/blog');
    if (!response.ok) {
      throw new Error('获取博客数据失败');
    }
    return await response.json();
  } catch (error) {
    console.error('获取博客数据出错:', error);
    return [];
  }
}

export default async function BlogPage() {
  // 在服务端直接获取数据
  const blogCategories = await getBlogCategories();

  // 构建面包屑路径
  const breadcrumbItems = [
    { title: <Link href="/"><HomeOutlined /> 首页</Link> },
    { title: <ReadOutlined> 博客 </ReadOutlined> }
  ];

  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      
      <Title level={2}>博客文章</Title>
      
      {blogCategories.map((categoryItem) => (
        <Card 
          key={categoryItem.category} 
          title={<><FolderOutlined /> {categoryItem.category.toUpperCase()}</>}
          style={{ marginBottom: 24 }}
          type="inner"
        >
          {categoryItem.subcategories.map((subcategory) => (
            <div key={subcategory.name} style={{ marginBottom: 16 }}>
              <Title level={4} style={{ marginBottom: 16, textTransform: 'capitalize' }}>
                {subcategory.name}
              </Title>
              
              <List
                itemLayout="horizontal"
                dataSource={subcategory.posts}
                renderItem={(post) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <Link href={`/blog/${post.slug.join('/')}`}>
                          {post.title}
                        </Link>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
          ))}
        </Card>
      ))}
      
      <Space style={{ marginTop: 24 }}>
        <Link href="/">
          <Tag color="blue">返回首页</Tag>
        </Link>
      </Space>
    </Card>
  );
}