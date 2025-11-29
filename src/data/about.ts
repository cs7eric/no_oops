// About页面数据模型
export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  id: number;
  company: { zh: string; en: string };
  position: { zh: string; en: string };
  duration: { zh: string; en: string };
  description: { zh: string; en: string };
}

export interface Education {
  degree: { zh: string; en: string };
  school: { zh: string; en: string };
  duration: { zh: string; en: string };
}

// 技能数据
export const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "Vue.js", level: 85 },
    { name: "TypeScript", level: 88 },
    { name: "Tailwind CSS", level: 92 },
    { name: "Shadcn UI", level: 80 },
    { name: "Next.js", level: 85 },
    { name: "Redux", level: 82 },
    { name: "Webpack", level: 78 },
    { name: "Sass", level: 80 },
    { name: "Jest", level: 75 },
    { name: "Cypress", level: 70 },
    { name: "Storybook", level: 65 },
  ],
  backend: [
    { name: "Java", level: 95 },
    { name: "Spring Boot", level: 90 },
    { name: "Spring Cloud", level: 85 },
    { name: "MySQL", level: 88 },
    { name: "Redis", level: 80 },
    { name: "MongoDB", level: 75 },
    { name: "Node.js", level: 82 },
    { name: "PostgreSQL", level: 70 },
    { name: "Kafka", level: 72 },
    { name: "GraphQL", level: 68 },
    { name: "Elasticsearch", level: 65 },
    { name: "RabbitMQ", level: 70 },
    { name: "Docker", level: 85 },
  ],
  devops: [
    { name: "Docker", level: 85 },
    { name: "Kubernetes", level: 75 },
    { name: "Jenkins", level: 80 },
    { name: "Linux", level: 82 },
    { name: "AWS", level: 70 },
    { name: "Git", level: 90 },
    { name: "Nginx", level: 78 },
    { name: "Terraform", level: 65 },
    { name: "Prometheus", level: 60 },
    { name: "Grafana", level: 65 },
    { name: "Ansible", level: 60 },
    { name: "Helm", level: 55 },
  ]
};

// 经验数据
export const experiences: Experience[] = [
  {
    id: 1,
    company: { zh: "杭州某科技有限公司", en: "Hangzhou Tech Co., Ltd." },
    position: { zh: "高级全栈工程师", en: "Senior Full Stack Engineer" },
    duration: { zh: "2022年6月 - 至今", en: "June 2022 - Present" },
    description: { 
      zh: "负责公司核心产品的全栈开发，主导微服务架构设计，提升系统性能和稳定性。", 
      en: "Responsible for full-stack development of core products, led microservice architecture design to improve system performance and stability." 
    }
  },
  {
    id: 2,
    company: { zh: "上海某互联网公司", en: "Shanghai Internet Co." },
    position: { zh: "Java开发工程师", en: "Java Developer" },
    duration: { zh: "2020年3月 - 2022年5月", en: "March 2020 - May 2022" },
    description: { 
      zh: "参与电商平台后端开发，优化数据库查询性能，实现高并发处理。", 
      en: "Participated in backend development of e-commerce platform, optimized database query performance, and implemented high-concurrency processing." 
    }
  },
  {
    id: 3,
    company: { zh: "北京某软件公司", en: "Beijing Software Co." },
    position: { zh: "初级开发工程师", en: "Junior Developer" },
    duration: { zh: "2018年7月 - 2020年2月", en: "July 2018 - February 2020" },
    description: { 
      zh: "负责企业内部管理系统开发，学习并应用主流开发框架。", 
      en: "Responsible for internal management system development, learned and applied mainstream development frameworks." 
    }
  }
];

// 教育背景
export const education: Education = {
  degree: { zh: "计算机科学与技术学士", en: "Bachelor of Computer Science and Technology" },
  school: { zh: "杭州电子科技大学", en: "Hangzhou Dianzi University" },
  duration: { zh: "2014年9月 - 2018年6月", en: "September 2014 - June 2018" }
};