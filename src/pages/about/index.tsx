import { useState } from "react";
import { motion } from "framer-motion";
import { title } from "@/components/primitives.ts";
import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import { GithubIcon, TwitterIcon } from "@/components/icons";
import { skills, experiences } from "@/data/about";
import ShinyText from "@/components/shiny-text";
import ReactBitsShinyText from "@/components/react-bits-shiny-text";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutPage() {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

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
            {language === 'zh' ? '关于我' : 'About Me'}
          </h1>
          <motion.p 
            className="text-default-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ReactBitsShinyText 
              text={language === 'zh' 
                ? "一位热爱技术的全栈开发者，专注于创造优秀的用户体验和高效的解决方案。" 
                : "A passionate full-stack developer focused on creating excellent user experiences and efficient solutions."}
              duration={3}
              shineColor="rgba(255,215,0,0.9)" // Gold shine
              textColor="#333"
            />
          </motion.p>
        </motion.div>

        {/* 个人简介 */}
        <motion.div
          className="bg-content1 rounded-2xl border border-default-200 p-8 mb-12 shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48" />
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">
                Chen Shuaiqi (cs7eric)
              </h2>
              <p className="text-default-700 mb-6 leading-relaxed">
                {language === 'zh' 
                  ? "我是一名热爱编程的全栈开发者，拥有超过5年的软件开发经验。我热衷于学习新技术，特别关注优雅的代码架构和设计模式。我希望能够运用自己的技术技能构建有价值的应用程序，为人们的生活带来改变。" 
                  : "I am a passionate full-stack developer with over 5 years of software开发 experience. I love learning new technologies, especially elegant code architectures and design patterns. I hope to leverage my technical skills to build valuable applications that can make a difference in people's lives."}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Button
                  as={Link}
                  href="https://github.com/cs7eric"
                  target="_blank"
                  variant="flat"
                  color="default"
                  startContent={<GithubIcon />}
                >
                  GitHub
                </Button>
                <Button
                  as={Link}
                  href="https://twitter.com/cs7eric"
                  target="_blank"
                  variant="flat"
                  color="default"
                  startContent={<TwitterIcon />}
                >
                  Twitter
                </Button>
                <Button
                  as={Link}
                  href="mailto:no_oops@icloud.com"
                  variant="flat"
                  color="primary"
                >
                  {language === 'zh' ? '联系我' : 'Contact Me'}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 技能 */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-default-200">
            {language === 'zh' ? '技能' : 'Skills'}
          </h2>
          
          <div className="space-y-8">
            {/* Frontend Skills */}
            <div>
              <motion.h3 
                className="text-xl font-semibold mb-4 text-blue-500 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                Frontend
              </motion.h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {skills.frontend.map((skill, index) => {
                  // Determine skill level based on percentage
                  let stars = [];
                  const level = Math.floor(skill.level / 20); // Convert to 1-5 scale
                  for (let i = 0; i < 5; i++) {
                    stars.push(
                      <span 
                        key={i} 
                        className={`text-xs ${i < level ? 'text-blue-500' : 'text-default-300'}`}
                      >
                        ★
                      </span>
                    );
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      className="bg-content1 border border-default-200 rounded-lg p-3 text-center shadow-sm"
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.6 + index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <div className="font-medium text-default-800 text-sm mb-1 truncate">{skill.name}</div>
                      <div className="flex justify-center">{stars}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Backend Skills */}
            <div>
              <motion.h3 
                className="text-xl font-semibold mb-4 text-green-500 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Backend
              </motion.h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {skills.backend.map((skill, index) => {
                  // Determine skill level based on percentage
                  let stars = [];
                  const level = Math.floor(skill.level / 20); // Convert to 1-5 scale
                  for (let i = 0; i < 5; i++) {
                    stars.push(
                      <span 
                        key={i} 
                        className={`text-xs ${i < level ? 'text-green-500' : 'text-default-300'}`}
                      >
                        ★
                      </span>
                    );
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      className="bg-content1 border border-default-200 rounded-lg p-3 text-center shadow-sm"
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.8 + index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <div className="font-medium text-default-800 text-sm mb-1 truncate">{skill.name}</div>
                      <div className="flex justify-center">{stars}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* DevOps Skills */}
            <div>
              <motion.h3 
                className="text-xl font-semibold mb-4 text-purple-500 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                DevOps
              </motion.h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {skills.devops.map((skill, index) => {
                  // Determine skill level based on percentage
                  let stars = [];
                  const level = Math.floor(skill.level / 20); // Convert to 1-5 scale
                  for (let i = 0; i < 5; i++) {
                    stars.push(
                      <span 
                        key={i} 
                        className={`text-xs ${i < level ? 'text-purple-500' : 'text-default-300'}`}
                      >
                        ★
                      </span>
                    );
                  }
                  
                  return (
                    <motion.div
                      key={index}
                      className="bg-content1 border border-default-200 rounded-lg p-3 text-center shadow-sm"
                      initial={{ opacity: 0, y: 20, rotateX: -90 }}
                      animate={{ opacity: 1, y: 0, rotateX: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 1.0 + index * 0.05,
                        type: "spring",
                        stiffness: 200,
                        damping: 20
                      }}
                    >
                      <div className="font-medium text-default-800 text-sm mb-1 truncate">{skill.name}</div>
                      <div className="flex justify-center">{stars}</div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 工作经验 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-default-200">
            {language === 'zh' ? '工作经验' : 'Work Experience'}
          </h2>
          <div className="space-y-6">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className="bg-content1 rounded-2xl border border-default-200 p-6 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <h3 className="text-xl font-semibold mb-1">
                  <ReactBitsShinyText 
                    text={language === 'zh' ? exp.position.zh : exp.position.en} 
                    duration={3}
                    shineColor="rgba(255,215,0,0.9)"
                  />
                </h3>
                <p className="text-primary font-medium mb-2">
                  {language === 'zh' ? exp.company.zh : exp.company.en}
                </p>
                <p className="text-default-600 text-sm mb-3">
                  {language === 'zh' ? exp.duration.zh : exp.duration.en}
                </p>
                <p className="text-default-700">
                  {language === 'zh' ? exp.description.zh : exp.description.en}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}