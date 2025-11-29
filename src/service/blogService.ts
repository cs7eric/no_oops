import blogData from '@/data/blogData.json';

export interface BlogPost {
  id: string;
  title: string;
  categories: string[];
  tags: string[];
  date: string;
  excerpt: string;
  content: string;
}

export const getAllBlogPosts = (): BlogPost[] => {
  return blogData as unknown as BlogPost[];
};

export const getBlogPostById = (id: string): BlogPost | null => {
  const post = (blogData as BlogPost[]).find((post: BlogPost) => post.id === id);
  return post ? post : null;
};