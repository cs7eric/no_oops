import { useLanguage } from "@/contexts/LanguageContext";

// Simple translation dictionary
const translations = {
  // Home page translations
  'home.title': {
    en: 'Welcome',
    zh: '欢迎'
  },
  'home.description': {
    en: 'Welcome to my personal website',
    zh: '欢迎来到我的个人网站'
  },
  
  // Project page translations
  'project.title': {
    en: 'Projects',
    zh: '项目'
  },
  'project.description': {
    en: 'Here are some of my projects',
    zh: '以下是我的一些项目'
  },
  
  // Blog page translations
  'blog.title': {
    en: 'Blog',
    zh: '博客'
  },
  'blog.description': {
    en: 'My latest blog posts',
    zh: '我的最新博客文章'
  },
  
  // Reading page translations
  'reading.title': {
    en: 'Reading',
    zh: '阅读'
  },
  'reading.description': {
    en: 'Books I\'m reading, notes I\'ve taken, and thoughts I\'ve had',
    zh: '我正在读的书、做的笔记和思考'
  },
  
  // Resume page translations
  'resume.title': {
    en: 'Resume',
    zh: '简历'
  },
  'resume.description': {
    en: 'My professional experience',
    zh: '我的专业经历'
  },
  
  // About page translations
  'about.title': {
    en: 'About',
    zh: '关于'
  },
  'about.description': {
    en: 'Learn more about me',
    zh: '了解更多关于我的信息'
  },
  
  // AI page translations
  'ai.title': {
    en: 'AI',
    zh: '人工智能'
  },
  'ai.description': {
    en: 'AI projects and experiments',
    zh: 'AI项目和实验'
  }
};

export const useTranslation = () => {
  const { language } = useLanguage();
  
  const t = (key: string) => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) return key;
    return translation[language] || translation.en || key;
  };
  
  return { t, language };
};