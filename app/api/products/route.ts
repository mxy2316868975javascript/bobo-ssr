import { NextResponse } from 'next/server';

// 模拟产品数据库
const products = [
  { id: 1, name: '产品 1', description: '这是产品1的详细描述', price: '¥99.00', features: ['特性1', '特性2', '特性3'] },
  { id: 2, name: '产品 2', description: '这是产品2的详细描述', price: '¥199.00', features: ['特性1', '特性2'] },
  { id: 3, name: '产品 3', description: '这是产品3的详细描述', price: '¥299.00', features: ['特性1', '特性2', '特性3', '特性4'] },
];

// 获取所有产品列表
export async function GET() {
  return NextResponse.json(products);
}