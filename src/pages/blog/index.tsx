import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion } from 'framer-motion';
import { Button } from '@heroui/button';
import { getAllBlogPosts, getBlogPostById, BlogPost } from '@/service/blogService';
import { useTranslation } from '@/hooks/useTranslation';

export default function BlogPage() {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (id) {
      const post = getBlogPostById(id);
      setCurrentPost(post);
    } else {
      const allPosts = getAllBlogPosts();
      setPosts(allPosts);
      setCurrentPost(null);
    }
  }, [id]);

  const handlePostClick = (postId: string) => {
    navigate(`/blog/${postId}`);
  };

  const handleBackToList = () => {
    navigate('/blog');
  };

  if (currentPost) {
    return (
      <section className="min-h-screen py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button 
              onClick={handleBackToList}
              variant="flat"
              color="primary"
              className="mb-4"
            >
              ← Back to Blog List
            </Button>
            <h1 className="text-3xl font-bold mb-2">{currentPost.title}</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPost.categories?.map((category, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {category}
                </span>
              ))}
              {currentPost.tags?.map((tag, index) => (
                <span key={index} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
              <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {new Date(currentPost.date).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
          
          <motion.div
            className="bg-content1 rounded-2xl border border-default-200 p-6 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <article className="prose max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {currentPost.content}
              </ReactMarkdown>
            </article>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-default-600 max-w-2xl mx-auto">
            {t('blog.description')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(posts || []).map((post, index) => (
            <motion.div
              key={post.id}
              className="bg-content1 rounded-2xl border border-default-200 p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => handlePostClick(post.id)}
            >
              <h2 className="text-xl font-bold mb-3">{post.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {(post.categories || []).map((category, catIndex) => (
                  <span key={catIndex} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    {category}
                  </span>
                ))}
                {(post.tags || []).map((tag, tagIndex) => (
                  <span key={tagIndex} className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-default-700 mb-4 text-sm">{post.excerpt}</p>
              <div className="text-default-500 text-xs">
                {new Date(post.date).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>

        {(posts || []).length === 0 && (
          <div className="text-center py-12">
            <p className="text-default-500">No blog posts found.</p>
          </div>
        )}
      </div>
    </section>
  );
}