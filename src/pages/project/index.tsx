import { useState } from "react";
import { motion } from "framer-motion";
import { title } from "@/components/primitives.ts";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { GithubIcon } from "@/components/icons";
import { projects } from "@/data/project";

// 技术栈颜色映射
const getTechColor = (tech: string) => {
  const colors: Record<string, string> = {
    // 前端技术
    "React": "bg-blue-500/10 text-blue-500",
    "Vue": "bg-green-500/10 text-green-500",
    "Angular": "bg-red-500/10 text-red-500",
    "TailwindCSS": "bg-cyan-500/10 text-cyan-500",
    "Shadcn UI": "bg-purple-500/10 text-purple-500",
    "JavaScript": "bg-yellow-500/10 text-yellow-500",
    "TypeScript": "bg-blue-600/10 text-blue-600",
    
    // 后端技术
    "SpringBoot": "bg-green-600/10 text-green-600",
    "SpringCloud": "bg-green-700/10 text-green-700",
    "SSM": "bg-green-800/10 text-green-800",
    "Java": "bg-red-600/10 text-red-600",
    "Node.js": "bg-green-500/10 text-green-500",
    "Python": "bg-blue-400/10 text-blue-400",
    
    // 数据库
    "MySQL": "bg-blue-700/10 text-blue-700",
    "PostgreSQL": "bg-blue-800/10 text-blue-800",
    "MongoDB": "bg-green-900/10 text-green-900",
    "Redis": "bg-red-700/10 text-red-700",
    "ElasticSearch": "bg-blue-900/10 text-blue-900",
    
    // 云服务和部署
    "Docker": "bg-blue-300/10 text-blue-300",
    "Kubernetes": "bg-blue-400/10 text-blue-400",
    "AWS": "bg-orange-500/10 text-orange-500",
    "Azure": "bg-blue-500/10 text-blue-500",
    "Nacos": "bg-purple-600/10 text-purple-600",
    "Gateway": "bg-indigo-500/10 text-indigo-500",
    "Minio": "bg-red-400/10 text-red-400",
    
    // 工具和库
    "Git": "bg-orange-600/10 text-orange-600",
    "Jenkins": "bg-red-800/10 text-red-800",
    "Guava": "bg-yellow-600/10 text-yellow-600",
    "MyBatis": "bg-red-900/10 text-red-900",
    "OpenAPI": "bg-green-400/10 text-green-400",
    "xxl-job": "bg-purple-700/10 text-purple-700",
    
    // 默认颜色
    "default": "bg-secondary/10 text-secondary"
  };
  
  // 精确匹配
  if (colors[tech]) {
    return colors[tech];
  }
  
  // 模糊匹配
  for (const [key, value] of Object.entries(colors)) {
    if (tech.includes(key)) {
      return value;
    }
  }
  
  // 默认颜色
  return colors["default"];
};

// 精致鎏金效果文本组件
const ElegantGildedText = ({ text, language }: { text: string; language: 'zh' | 'en' }) => {
  // 定义需要突出显示的关键词 - 中英文版本
  const highlightKeywords = language === 'zh' ? [
    "提升", "优化", "QPS", "响应时间", "效率", "架构", "设计", 
    "150%", "60%", "200%", "40ms", "20ms", "2分钟", "30分钟", "DDD", "微服务",
    "分布式", "缓存", "并发", "自动化", "统一", "零修改", "最终一致性", "高频",
    "每日多次部署", "模块化", "可插拔"
  ] : [
    "improved", "optimized", "QPS", "response time", "efficiency", "architecture", "design",
    "150%", "60%", "200%", "40ms", "20ms", "2 minutes", "30 minutes", "DDD", "microservices",
    "distributed", "cache", "concurrent", "automated", "unified", "zero modification", "eventual consistency", "high frequency",
    "multiple daily deployments", "modular", "plug-and-play"
  ];
  
  // 分割文本并突出显示关键词
  const parts = text.split(new RegExp(`(${highlightKeywords.join('|')})`, 'gi'));
  
  return (
    <span>
      {parts.map((part, index) => {
        const isHighlight = highlightKeywords.some(keyword => 
          part.toLowerCase() === keyword.toLowerCase()
        );
        
        return isHighlight ? (
          <motion.span 
            key={index} 
            className="relative inline-block px-1 rounded-sm"
            initial={{ 
              background: "linear-gradient(120deg, #e6c467, #f9d98e, #e6c467)",
              backgroundSize: "200% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 1px 2px rgba(230, 196, 103, 0.3)"
            }}
            animate={{ 
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            whileHover={{
              scale: 1.03,
              textShadow: "0 2px 4px rgba(230, 196, 103, 0.5)"
            }}
          >
            {part}
          </motion.span>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};

export default function ProjectPage() {
  const [language, setLanguage] = useState<'zh' | 'en'>('zh');
  
  const toggleLanguage = () => {
    setLanguage(prev => prev === 'zh' ? 'en' : 'zh');
  };

  return (
    <section className="min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-4">
          <Button 
            onClick={toggleLanguage}
            variant="flat"
            color="primary"
          >
            {language === 'zh' ? 'English' : '中文'}
          </Button>
        </div>
        
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className={`${title()} mb-6`}>
            My <span className="text-primary">Projects</span>
          </h1>
          <motion.p 
            className="text-default-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {language === 'zh' 
              ? "探索我的项目作品集，展示技术专长和解决问题的能力。" 
              : "Explore my portfolio of innovative projects showcasing technical expertise and problem-solving skills."}
          </motion.p>
        </motion.div>

        <motion.div
          className="space-y-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: "easeOut"
                }
              }}
            >
              <div className="bg-content1 rounded-2xl border border-default-200 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 p-6 md:p-8">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                          {language === 'zh' ? project.name.zh : project.name.en}
                        </h2>
                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                            {language === 'zh' ? project.role.zh : project.role.en}
                          </span>
                          <span className="text-default-500">{project.duration}</span>
                        </div>
                      </div>
                      
                      {project.githubUrl && (
                        <Button
                          as={Link}
                          href={project.githubUrl}
                          target="_blank"
                          variant="flat"
                          color="default"
                          startContent={<GithubIcon />}
                          className="self-start"
                        >
                          {language === 'zh' ? '查看GitHub' : 'View on GitHub'}
                        </Button>
                      )}
                    </div>
                    
                    <p className="text-default-700 mb-6 leading-relaxed">
                      {language === 'zh' ? project.description.zh : project.description.en}
                    </p>
                    
                    <div className="mb-6">
                      <h3 className="font-semibold text-default-800 text-lg mb-3">
                        {language === 'zh' ? '使用技术' : 'Technologies Used'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <motion.div
                            key={techIndex}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: 1, 
                              scale: 1,
                              transition: {
                                duration: 0.3,
                                delay: 0.05 * techIndex,
                                ease: "easeOut"
                              }
                            }}
                            whileHover={{ 
                              scale: 1.05,
                              y: -2,
                              transition: { duration: 0.2 }
                            }}
                          >
                            <span className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${getTechColor(tech)}`}>
                              {tech}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-default-200 my-6"></div>
                
                <div>
                  <h3 className="font-semibold text-default-800 text-lg mb-4">
                    {language === 'zh' ? '关键成就' : 'Key Achievements'}
                  </h3>
                  <ul className="space-y-3">
                    {project.achievements.map((achievement, achIndex) => (
                      <motion.li 
                        key={achIndex}
                        className="flex items-start"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: {
                            duration: 0.4,
                            delay: 0.05 * achIndex,
                            ease: "easeOut"
                          }
                        }}
                        whileHover={{ x: 5 }}
                      >
                        <span className="text-primary mt-1 mr-3">•</span>
                        <span className="text-default-700">
                          <ElegantGildedText 
                            text={language === 'zh' ? achievement.zh : achievement.en} 
                            language={language}
                          />
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="border border-default-200 rounded-2xl max-w-2xl mx-auto p-6">
            <p className="text-default-600 text-lg">
              {language === 'zh' 
                ? "有兴趣合作或了解更多项目信息？" 
                : "Interested in collaborating or learning more about my projects?"}
              <Link 
                href="mailto:no_oops@icloud.com" 
                className="text-primary ml-2 hover:underline"
              >
                {language === 'zh' ? '联系我们' : 'Let\'s connect!'}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}