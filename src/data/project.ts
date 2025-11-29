// Project页面数据模型
export interface Project {
  id: number;
  name: { zh: string; en: string };
  description: { zh: string; en: string };
  technologies: string[];
  role: { zh: string; en: string };
  duration: string;
  achievements: { zh: string; en: string }[];
  githubUrl?: string;
}

// 项目数据 - 中英文版本
export const projects: Project[] = [
  {
    id: 1,
    name: { 
      zh: "DevSphere 程序员交流社区", 
      en: "DevSphere Developer Community" 
    },
    description: { 
      zh: "DevSphere 是一款专门为程序员打造的沟通交流社区，采用主流的微服务框架+主流C端技术栈来做为技术架构。旨在统一程序员信息差，进行平台统一化，程序员可以在平台，完善自身知识，刷自身薄弱点面试题，配合练习，模拟面试，简历分析模块来提升程序员面试能力。",
      en: "DevSphere is a communication community specifically designed for programmers, using mainstream microservice frameworks and C-end technology stacks as its technical architecture. It aims to unify information gaps among programmers and provide a unified platform where developers can enhance their knowledge, practice interview questions, and improve interview skills through exercises, mock interviews, and resume analysis modules."
    },
    technologies: ["SpringBoot", "SpringCloud Alibaba", "SSM", "Gateway", "MySQL", "ElasticSearch", "Redis", "Nacos", "Minio", "Guava", "React", "Shadcn UI", "TailwindCSS", "OpenAPI"],
    role: { 
      zh: "全栈架构师", 
      en: "Full-stack Architect" 
    },
    duration: "2023.03 - Present",
    achievements: [
      {
        zh: "主导完成从0到1的系统架构设计和技术选型，基于DDD思想拆分为7个微服务模块，通过Nacos实现服务治理，Gateway统一API网关。",
        en: "Led the system architecture design and technology selection from scratch, divided into 7 microservices modules based on DDD principles, implemented service governance with Nacos, and unified API gateway with Gateway."
      },
      {
        zh: "针对性能瓶颈，采用FutureTask+CompletableFuture实现并发查询优化，使核心接口响应时间从230ms降至40ms。",
        en: "Optimized performance bottlenecks by implementing concurrent query optimization with FutureTask+CompletableFuture, reducing core API response time from 230ms to 40ms."
      },
      {
        zh: "设计多级缓存架构，采用Redis作为分布式缓存，配合Guava本地缓存，通过合理的缓存过期策略和预加载机制，使系统QPS提升150%",
        en: "Designed multi-level caching architecture using Redis as distributed cache with Guava local cache, achieving 150% QPS improvement through proper cache expiration strategies and preloading mechanisms."
      },
      {
        zh: "设计并实现基于Git+Jenkins+Shell的CI/CD流水线，通过自动化构建、部署，将部署时间从30分钟缩短至2分钟，效率提升200%，支持每日多次部署。",
        en: "Designed and implemented CI/CD pipeline based on Git+Jenkins+Shell, reducing deployment time from 30 minutes to 2 minutes through automated building and deployment, improving efficiency by 200% and supporting multiple daily deployments."
      },
      {
        zh: "采用Satoken框架实现基于角色的RBAC访问控制，并设计了一套完善的Token认证机制",
        en: "Implemented role-based RBAC access control using Satoken framework and designed a comprehensive Token authentication mechanism."
      },
      {
        zh: "运用策略工厂模式实现多平台登录认证，提升代码复用率60%；通过适配器模式封装文件存储服务，无缝支持Minio、阿里云OSS等多种存储方案，实现存储平台切换时业务代码零修改。",
        en: "Implemented multi-platform login authentication using strategy factory pattern, improving code reusability by 60%; encapsulated file storage services with adapter pattern, seamlessly supporting multiple storage solutions like Minio and Alibaba Cloud OSS with zero business code changes when switching storage platforms."
      },
      {
        zh: "基于Redis（Hash+String）实现点赞、收藏功能，通过XXL-JOB定时同步至MySQL，保证数据最终一致性，平均响应时间<20ms。针对热点场景进行优化，支持高频访问。",
        en: "Implemented like and favorite functions based on Redis (Hash+String), with scheduled synchronization to MySQL via XXL-JOB, ensuring eventual data consistency with average response time <20ms. Optimized for hot scenarios to support high-frequency access."
      },
      {
        zh: "登录模块抽取微信微服务，实现微信的对接回调与sdk的统一封装，沉淀出无业务性的微信对接服务；",
        en: "Extracted WeChat microservice from login module, implemented WeChat callback integration and unified SDK encapsulation, creating a business-neutral WeChat integration service."
      },
      {
        zh: "重构原有复杂代码，采取工厂+策略模式实现微信的消息解耦处理，采取适配器模式实现oss对接；",
        en: "Refactored complex legacy code, implemented decoupled WeChat message processing using factory+strategy patterns, and OSS integration using adapter pattern."
      },
      {
        zh: "独立从0到1通过云服务器搭建整体项目的环境及各依赖的安装；",
        en: "Independently set up the entire project environment and installed all dependencies from scratch on cloud servers."
      }
    ]
  },
  {
    id: 2,
    name: { 
      zh: "cccs7-frame 脚手架", 
      en: "cccs7-frame Scaffolding" 
    },
    description: { 
      zh: "cccs7-Frame是一款专门企业级开发脚手架，内部进行高度封装集成，覆盖企业级开发常用的工具及业务场景。达到开箱即用，上手快，学习成本低的价值导向。用于解决中小项目进行开发时，每次要进行框架搭建选择的痛点。进行统一的规范和组件封装，使开发者更加专注于业务价值",
      en: "cccs7-Frame is an enterprise-level development scaffolding with highly encapsulated integrations covering common tools and business scenarios. It provides out-of-the-box functionality with fast learning curve and low learning costs. It solves the pain point of framework selection in small to medium project development by providing unified standards and component encapsulation, allowing developers to focus more on business value."
    },
    technologies: ["SSM", "Springboot", "SpringCloud", "MyBatis-Plus", "MySQL", "Redis", "xxl-job", "Guava"],
    role: { 
      zh: "架构师 & 核心开发者", 
      en: "Architect & Core Developer" 
    },
    duration: "2022.06 - 2023.02",
    githubUrl: "https://github.com/cs7eric/cccs7-frame",
    achievements: [
      {
        zh: "独立从0到1负责项目的架构设计，技术选型，把控框架质量及框架价值导向，调研业务场景；",
        en: "Independently responsible for project architecture design, technology selection, framework quality control and value orientation, and business scenario research from scratch."
      },
      {
        zh: "采用模块化思想，对项目模块进行拆分设计，模块可插拔，可按需选择模块装载，模块间解耦",
        en: "Adopted modular thinking to design project modules with plug-and-play capability, on-demand module selection, and decoupling between modules."
      },
      {
        zh: "负责核心common-redis模块的建设，提供分布式锁，本地缓存，lua脚本，pipeline等功能设计；",
        en: "Responsible for building the core common-redis module, providing distributed locks, local caching, Lua scripts, pipeline and other functionality designs."
      },
      {
        zh: "对常用业务场景，例如数据归档，链路追踪，多数据源等进行覆盖封装，提高速度，简化开发步骤。",
        en: "Provided encapsulation for common business scenarios such as data archiving, link tracing, and multiple data sources, improving speed and simplifying development steps."
      },
      {
        zh: "集成常用中间件mysql，redis，es，mq，xxljob等，并提供集成demo和starter封装",
        en: "Integrated common middleware including MySQL, Redis, ES, MQ, XXL-JOB, etc., and provided integration demos and starter encapsulations."
      }
    ]
  }
];