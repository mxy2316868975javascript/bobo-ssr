'use client';

import Image from "next/image";
import Link from "next/link";
import { Typography, Card, Row, Col, Button, Space, Divider } from 'antd';
import { HomeOutlined, ReadOutlined, ShoppingOutlined, BookOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Home() {
  return (
    <Card variant={false} style={{ minHeight: '80vh' }}>
      <Row gutter={[24, 24]} justify="center" align="middle">
        <Col xs={24} md={16} lg={12} style={{ textAlign: 'center' }}>
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
            style={{ marginBottom: 24 }}
          />
          
          <Title level={2}>欢迎使用 Next.js 应用</Title>
          
          <Paragraph>
            这是一个使用 Next.js 15 和 Ant Design 构建的现代化应用程序。
            通过这个应用，您可以浏览产品、阅读博客文章和查看指南。
          </Paragraph>
          
          <Divider />
          
          <Row gutter={[16, 16]} justify="center">
            <Col>
              <Button type="primary" size="large" icon={<ShoppingOutlined />}>
                <Link href="/products">浏览产品</Link>
              </Button>
            </Col>
            <Col>
              <Button size="large" icon={<ReadOutlined />}>
                <Link href="/blog">阅读博客</Link>
              </Button>
            </Col>
            <Col>
              <Button size="large" icon={<BookOutlined />}>
                <Link href="/guides">查看指南</Link>
              </Button>
            </Col>
          </Row>
          
          <Divider />
          
          <Row gutter={[16, 16]} justify="center">
            <Col>
              <Button type="link" href="https://nextjs.org/docs" target="_blank">
                <Space>
                  <Image src="/file.svg" alt="Docs" width={16} height={16} />
                  <span>文档</span>
                </Space>
              </Button>
            </Col>
            <Col>
              <Button type="link" href="https://vercel.com/templates" target="_blank">
                <Space>
                  <Image src="/window.svg" alt="Templates" width={16} height={16} />
                  <span>模板</span>
                </Space>
              </Button>
            </Col>
            <Col>
              <Button type="link" href="https://vercel.com/new" target="_blank">
                <Space>
                  <Image src="/vercel.svg" alt="Deploy" width={16} height={16} />
                  <span>部署</span>
                </Space>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
