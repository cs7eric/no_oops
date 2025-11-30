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
  const posts = blogData as unknown as BlogPost[];
  // Ensure categories and tags are arrays, even if undefined
  return posts.map(post => ({
    ...post,
    categories: Array.isArray(post.categories) ? post.categories : [],
    tags: Array.isArray(post.tags) ? post.tags : []
  }));
};

export const getBlogPostById = (id: string): BlogPost | null => {
  const posts = getAllBlogPosts();
  const post = posts.find((post: BlogPost) => post.id === id);
  return post ? post : null;
};