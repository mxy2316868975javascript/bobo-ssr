'use client';

import Link from 'next/link';
import { Typography, Card, List, Space, Breadcrumb, Divider, Tag } from 'antd';
import { UserOutlined, CalendarOutlined, HomeOutlined, BookOutlined, ReadOutlined } from '@ant-design/icons';
import { GuidesData } from '@/app/types';

const { Title, Paragraph, Text } = Typography;

// 模拟指南数据
const guides: GuidesData = {
  'getting-started': {
    title: '入门指南',
    description: '帮助您开始使用我们产品的详细指南，介绍基本概念和初始配置。',
    author: '张三',
    publishedAt: '2023-10-15',
  },
  'advanced-techniques': {
    title: '高级技巧',
    description: '涵盖了一些高级用法和技巧，帮助您充分利用我们的产品功能。',
    author: '李四',
    publishedAt: '2023-11-20',
  },
  'troubleshooting': {
    title: '故障排除',
    description: '提供了常见问题的解决方案和故障排除步骤，帮助您快速解决问题。',
    author: '王五',
    publishedAt: '2023-12-05',
  },
};

export default function GuidesPage() {
  // 构建面包屑路径
  const breadcrumbItems = [
    { title: <Link href="/"><HomeOutlined /> 首页</Link> },
    { title: <BookOutlined> 产品指南 </BookOutlined> }
  ];
  
  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      
      <Title level={3}>产品指南</Title>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16, marginTop: 24 }}>
        {Object.entries(guides).map(([slug, guide]) => (
          <Card key={slug} hoverable style={{ marginBottom: 16 }}>
            <Card.Meta
              title={
                <Link href={`/guides/${slug}`}>
                  {guide.title}
                </Link>
              }
              description={
                <>
                  <Paragraph ellipsis={{ rows: 2 }}>{guide.description}</Paragraph>
                  <Space split={<Divider type="vertical" />}>
                    <Text type="secondary"><UserOutlined /> {guide.author}</Text>
                    <Text type="secondary"><CalendarOutlined /> {guide.publishedAt}</Text>
                  </Space>
                </>
              }
            />
          </Card>
        ))}
      </div>
    </Card>
  );
}