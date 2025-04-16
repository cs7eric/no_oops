import {motion} from "framer-motion";
import {Link} from "@heroui/link";
import {Snippet} from "@heroui/snippet";
import {Code} from "@heroui/code";
import {button as buttonStyles} from "@heroui/theme";

import {IoCodeSlashOutline} from "react-icons/io5";
import {GithubIcon} from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import BlurText from "@/components/text/blur-text.tsx";

// 动画配置
const container = {
  hidden: {opacity: 0},
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // 每个子元素之间的延迟
    }
  }
};

const item = {
  hidden: {opacity: 0, y: 30},
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export default function IndexPage() {
  return (
    <DefaultLayout>
      <motion.section
        className="flex flex-col items-center justify-center gap-4 py-8 md:py-10"
        initial="hidden"
        whileInView="visible"
        viewport={{once: true, margin: "-100px 0px -100px 0px"}}
        variants={container}
      >
        {/* 欢迎标题部分 */}
        <motion.div
          className="welcome-title"
          variants={item}
        >
          <div className="blur-text">
            <BlurText
              text="Hi, I am cccs7/cs7eric 👋"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={() => {
              }}
              className="text-4xl font-bold mb-8"
            />
          </div>
        </motion.div>

        {/* 头像部分 */}
        <motion.div
          className="avatar"
          variants={item}
        >
          <div className="flex justify-center">
            <video
              autoPlay
              muted
              loop
              playsInline
              disablePictureInPicture
              style={{width: '50%', height: '50%', objectFit: 'contain'}}
            >
              <source src="/public/aniemoji.mp4" type="video/mp4"/>
              您的浏览器不支持HTML5视频
            </video>
          </div>
        </motion.div>

        {/* 介绍部分 */}
        <motion.div
          className="intro flex flex-col items-center space-y-7"
          variants={item}
        >
          <div className="career font-bold text-3xl">
            Java Developer 👨🏻‍💻
          </div>
          <div className="detail-intro flex flex-col items-center">
            <span>Welcome to my personal page!</span>
            <span>Just a developer who likes to build something i wanna do</span>
          </div>
        </motion.div>

        <motion.div
          className={'program-stack'}
          variants={item}
        >
          <div className="backend grid sm:grid-cols-5">
            <div className="tech-stack-item h-10 w-10 rounded-full p-1 border"></div>
          </div>
          <div className="frontend"></div>
          <div className="devops"></div>

        </motion.div>

        {/* 按钮部分 */}
        <motion.div
          className="flex gap-3"
          variants={item}
        >
          <Link
            isExternal
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
            })}
            href={'http://cs7eric.github.io/'}
          >
            <IoCodeSlashOutline/>
            Project
          </Link>
          <Link
            isExternal
            className={buttonStyles({variant: "bordered", radius: "full"})}
            href={'https://github.com/cs7eric'}
          >
            <GithubIcon size={20}/>
            GitHub
          </Link>
        </motion.div>

        {/* 底部代码片段 */}
        <motion.div
          className="mt-8"
          variants={item}
        >
          <Snippet hideCopyButton hideSymbol variant="bordered">
            <span>
              Get started by editing{" "}
              <Code color="primary">pages/index.tsx</Code>
            </span>
          </Snippet>
        </motion.div>
      </motion.section>
    </DefaultLayout>
  );
}