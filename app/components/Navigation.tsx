'use client';

import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import { HomeOutlined, ReadOutlined, ShoppingOutlined, AppstoreOutlined, DesktopOutlined, GiftOutlined, BookOutlined, ToolOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

interface NavigationProps {
  children: React.ReactNode;
}

const Navigation: React.FC<NavigationProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  
  // 获取当前路径的第一级路径
  const firstLevelPath = pathname.split('/')[1] || '';
  
  // 根据当前路径确定选中的菜单项
  const selectedKeys = [firstLevelPath || 'home'];
  
  // 根据当前路径确定打开的子菜单
  const openKeys = firstLevelPath ? [firstLevelPath] : [];
  
  // 获取当前路径的第二级路径
  const secondLevelPath = pathname.split('/')[2] || '';
  
  // 根据当前路径确定选中的子菜单项
  const selectedSubMenuKeys = secondLevelPath ? [`${firstLevelPath}-${secondLevelPath}`] : [];
  
  // 确定默认展开的子菜单
  const defaultOpenKeys = firstLevelPath ? [firstLevelPath] : [];
  
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ 
        padding: 0, 
        background: '#001529', 
        position: 'sticky', 
        top: 0, 
        zIndex: 1, 
        width: '100%',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="demo-logo" style={{ color: 'white', fontSize: '18px', fontWeight: 'bold', margin: '0 24px' }}>
          Next.js 应用
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[...selectedKeys, ...selectedSubMenuKeys]}
          defaultOpenKeys={defaultOpenKeys}
          style={{ width: '100%' }}
          items={[
            {
              key: 'home',
              icon: <HomeOutlined />,
              label: <Link href="/">首页</Link>,
            },
            {
              key: 'blog',
              icon: <ReadOutlined />,
              label: '博客',
              children: [
                {
                  key: 'blog-tech',
                  icon: <DesktopOutlined />,
                  label: <Link href="/blog/tech">技术</Link>,
                },
                {
                  key: 'blog-design',
                  icon: <AppstoreOutlined />,
                  label: <Link href="/blog/design">设计</Link>,
                },
              ],
            },
            {
              key: 'products',
              icon: <ShoppingOutlined />,
              label: '产品',
              children: [
                {
                  key: 'products-featured',
                  icon: <GiftOutlined />,
                  label: <Link href="/products/featured">精选产品</Link>,
                },
                {
                  key: 'products-new',
                  icon: <GiftOutlined />,
                  label: <Link href="/products/new">新品</Link>,
                },
              ],
            },
            {
              key: 'guides',
              icon: <BookOutlined />,
              label: '指南',
              children: [
                {
                  key: 'guides-getting-started',
                  icon: <ToolOutlined />,
                  label: <Link href="/guides/getting-started">入门指南</Link>,
                },
                {
                  key: 'guides-advanced-techniques',
                  icon: <AppstoreOutlined />,
                  label: <Link href="/guides/advanced-techniques">高级技巧</Link>,
                },
                {
                  key: 'guides-troubleshooting',
                  icon: <QuestionCircleOutlined />,
                  label: <Link href="/guides/troubleshooting">故障排除</Link>,
                },
              ],
            },
          ]}
        />
      </Header>
      <Layout>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Navigation;