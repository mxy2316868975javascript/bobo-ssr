
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Typography, Space, Breadcrumb, Card, Divider, Tag, Button } from 'antd';
import { UserOutlined, CalendarOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { GuidesData, Guide } from '@/app/types';

type GuidePageProps = {
  params: {
    slug: string;
  };
};

const { Title, Paragraph, Text } = Typography;

// 模拟指南数据
const guides: GuidesData = {
  'getting-started': {
    title: '入门指南',
    content: '这是一个帮助您开始使用我们产品的详细指南。我们将介绍基本概念、安装步骤和初始配置。',
    author: '张三',
    publishedAt: '2023-10-15',
  },
  'advanced-techniques': {
    title: '高级技巧',
    content: '本指南涵盖了一些高级用法和技巧，帮助您充分利用我们的产品功能，提高工作效率。',
    author: '李四',
    publishedAt: '2023-11-20',
  },
  'troubleshooting': {
    title: '故障排除',
    content: '遇到问题了吗？本指南提供了常见问题的解决方案和故障排除步骤，帮助您快速解决问题。',
    author: '王五',
    publishedAt: '2023-12-05',
  },
};

// 这个函数在构建时运行，用于生成所有可能的路径参数
// 这是实现SSG的关键函数
export function generateStaticParams() {
  // 返回所有可能的slug参数
  return Object.keys(guides).map((slug) => ({
    slug,
  }));
}

export default function GuidePage({ params }: GuidePageProps) {
  const { slug } = params;
  const guide = guides[slug];
  
  // 如果找不到指南，返回404
  if (!guide) {
    notFound();
  }
  
  // 构建面包屑路径
  const breadcrumbItems = [
    { title: <Link href="/"><HomeOutlined /> 首页</Link> },
    { title: <Link href="/guides"><BookOutlined /> 指南</Link> },
    { title: guide.title }
  ];
  
  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      
      <Title level={2}>{guide.title}</Title>
      
      <Space split={<Divider type="vertical" />} style={{ marginBottom: 24 }}>
        <Text type="secondary"><UserOutlined /> {guide.author}</Text>
        <Text type="secondary"><CalendarOutlined /> {guide.publishedAt}</Text>
      </Space>
      
      <Card style={{ marginBottom: 24 }}>
        <Paragraph>{guide.content}</Paragraph>
      </Card>
      
      <Space>
        <Button type="primary">
          <Link href="/guides">返回指南列表</Link>
        </Button>
        <Button>
          <Link href="/">返回首页</Link>
        </Button>
      </Space>
    </Card>
  );
}