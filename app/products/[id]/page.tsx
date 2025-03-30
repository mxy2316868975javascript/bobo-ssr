'use client';

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Typography, Card, Descriptions, Tag, Space, Button, Breadcrumb, List } from 'antd';
import { HomeOutlined, ShoppingOutlined, TagOutlined } from '@ant-design/icons';
import { Product } from '@/app/types';

// 定义页面参数类型
type ProductPageProps = {
  params: {
    id: string;
  };
};

const { Title, Paragraph, Text } = Typography;

// 模拟产品数据库
const products: Product[] = [
  { id: 1, name: '产品 1', description: '这是产品1的详细描述', price: '¥99.00', features: ['特性1', '特性2', '特性3'] },
  { id: 2, name: '产品 2', description: '这是产品2的详细描述', price: '¥199.00', features: ['特性1', '特性2'] },
  { id: 3, name: '产品 3', description: '这是产品3的详细描述', price: '¥299.00', features: ['特性1', '特性2', '特性3', '特性4'] },
];

export default function ProductPage({ params }: ProductPageProps) {
  // 将URL参数转换为数字
  const productId = parseInt(params.id);
  
  // 查找对应的产品
  const product = products.find(p => p.id === productId);
  
  // 如果产品不存在，返回404页面
  if (!product) {
    notFound();
  }

  // 构建面包屑路径
  const breadcrumbItems = [
    { title: <Link href="/"><HomeOutlined /> 首页</Link> },
    { title: <Link href="/products"><ShoppingOutlined /> 产品列表</Link> },
    { title: product.name }
  ];

  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      
      <Title level={2}>{product.name}</Title>
      
      <Card style={{ marginBottom: 24 }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="产品描述">{product.description}</Descriptions.Item>
          <Descriptions.Item label="价格">
            <Text type="danger" style={{ fontSize: 18, fontWeight: 'bold' }}>{product.price}</Text>
          </Descriptions.Item>
          <Descriptions.Item label="产品特性">
            <List
              dataSource={product.features}
              renderItem={(feature) => (
                <List.Item>
                  <TagOutlined style={{ marginRight: 8 }} />{feature}
                </List.Item>
              )}
            />
          </Descriptions.Item>
        </Descriptions>
      </Card>
      
      <Space>
        <Button type="primary">
          <Link href="/products">返回产品列表</Link>
        </Button>
        <Button>
          <Link href="/">返回首页</Link>
        </Button>
      </Space>
    </Card>
  );
}