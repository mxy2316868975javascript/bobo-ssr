'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Typography, Card, List, Space, Breadcrumb, Spin, Alert, Button, Tag } from 'antd';
import { HomeOutlined, ShoppingOutlined, RightOutlined } from '@ant-design/icons';
import { Product } from '@/app/types';

const { Title, Paragraph, Text } = Typography;

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('获取产品数据失败');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // 构建面包屑路径
  const breadcrumbItems = [
    { title: <Link href="/"><HomeOutlined /> 首页</Link> },
    { title: <ShoppingOutlined> 产品列表 </ShoppingOutlined> }
  ];

  if (loading) {
    return (
      <Card variant={false} style={{ minHeight: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size="large" tip="加载中..." />
      </Card>
    );
  }

  if (error) {
    return (
      <Card variant={false} style={{ minHeight: '80vh' }}>
        <Alert message="错误" description={error} type="error" showIcon />
      </Card>
    );
  }

  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Breadcrumb items={breadcrumbItems} style={{ marginBottom: 16 }} />
      
      <Title level={2}>产品列表</Title>
      
      <List
        itemLayout="vertical"
        dataSource={products}
        renderItem={(product) => (
          <List.Item
            key={product.id}
            extra={
              <Button type="primary">
                <Link href={`/products/${product.id}`}>查看详情 <RightOutlined /></Link>
              </Button>
            }
          >
            <List.Item.Meta
              title={<Title level={4}>{product.name}</Title>}
              description={<Text>{product.description}</Text>}
            />
            <Tag color="blue">{product.price}</Tag>
          </List.Item>
        )}
      />
      
      <Space style={{ marginTop: 24 }}>
        <Link href="/">
          <Button>返回首页</Button>
        </Link>
      </Space>
    </Card>
  );
}