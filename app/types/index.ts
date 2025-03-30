// 博客文章类型定义
export interface BlogPost {
  title: string;
  content: string;
  date: string;
  author: string;
}

// 博客分类类型定义
export interface BlogCategory {
  category: string;
  subcategories: BlogSubcategory[];
}

export interface BlogSubcategory {
  name: string;
  posts: {
    slug: string[];
    title: string;
  }[];
}

// 博客数据结构类型定义
export interface BlogPostsData {
  [category: string]: {
    [subcategory: string]: {
      [post: string]: BlogPost;
    } | BlogPost;
  };
}

// 指南类型定义
export interface Guide {
  title: string;
  content: string;
  description?: string;
  author: string;
  publishedAt: string;
}

// 指南数据结构类型定义
export interface GuidesData {
  [slug: string]: Guide;
}

// 产品类型定义
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  features: string[];
}