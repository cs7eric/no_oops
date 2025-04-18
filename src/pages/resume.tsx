import DefaultLayout from "@/layouts/default";
import {siteConfig} from "@/config/site.ts";
import SkillStack from "@/components/stack.tsx";

export default function ResumePage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col  justify-center gap-4 py-2 md:py-3 px-4 md:px-8">

        <div className="personal-info">
          <h3 className={'text-left text-lg sm:text-xl font-semibold'}>陈帅旗</h3>
        </div>
        <div className="school-info font-semibold text-sm sm:text-md md:text-lg flex justify-between">
          <span className="school-name ">计算机科学与技术专业</span>
          <span className="year">2021.09 - 2025.06</span>
        </div>
        <div className="school-detail text-sm sm:text-base">
          <p>成绩优异， <strong>GPA 3.7/4.0 前7%</strong>，<strong>通过CET-4\CET-6</strong></p>
          <p>曾获 <strong>国家励志奖学金、学业奖学金</strong></p>
          <p>曾担任班长、校工作室技术负责人，主持并结项两项中国大学生创新创业实践项目，曾获团体程序设计天梯赛二等奖、中国大学生计算机设计大赛省赛</p>
        </div>
        <div className="skill">
          <div className="skill-item p-2 rounded-lg dark:bg-neutral-900 bg-default-100">
            <div className="title flex items-center">
              <img src="/logo/favicon.svg" className={'scale-50 size-10'} alt=""/>
              <h3 className={'font-semibold'}>About my skills / 我所掌握的技能</h3>
            </div>
            <div className="content px-3 my-2 text-xs sm:text-sm space-y-2 [&>.content-item]:bg-white [&>.content-item]:dark:bg-black  [&>.content-item]:rounded-md">
              <div className="content-item flex items-center">
                <img src="/icons/icons8-java.svg" className={'scale-50'} alt=""/>
                <p>扎实的Java技术能力，熟悉 <strong>集合框架、多线程编程 ( JUC ) 和 JVM 原理</strong></p>
              </div>
              <div className="content-item flex items-center py-2">
                <img src="/icons/icons8-spring-boot.svg" className={'scale-50'} alt=""/>
                <p >深入理解 Spring 生态，熟悉 Spring Boot, MyBatis, MyBatis-Plus等主流开发框架，熟悉 Nacos, Gateway
                  等组件，了解Spring Cloud 微服务架构</p>
              </div>
            </div>


          </div>
        </div>


        <div className="skill">
          <div className="skill-item p-2 rounded-lg dark:bg-neutral-900 bg-default-100">
            <div className="title flex items-center">
            <img src="/icons/icons8-backend-48.png" className={'scale-50'} alt=""/>
              <h3 className={'font-semibold'}>backend</h3>
            </div>
            <div className="content px-3 text-xs sm:text-sm space-y-1">
              <div className="content-item">
                扎实的Java技术能力，熟悉 <strong>集合框架、多线程编程 ( JUC ) 和 JVM 原理</strong>
              </div>
              <div className="content-item">
                深入理解 Spring 生态，熟悉 Spring Boot, MyBatis, MyBatis-Plus等主流开发框架，熟悉 Nacos, Gateway
                等组件，了解Spring Cloud 微服务架构
              </div>
            </div>
            <div className="tech-stack grid grid-cols-3 sm:grid-cols-8 gap-3 p-3 md:grid-cols-10">
              {siteConfig.backendStack.map((item) => (
                <>
                  <SkillStack stackItem={item}/>
                </>
              ))
              }
            </div>

          </div>
        </div>
        <div className="skill">
          <div className="skill-item p-2 rounded-lg dark:bg-neutral-900 bg-default-100">
            <div className="title flex items-center">
              <img src="/icons/icons8-js-48.png" className={'scale-50'} alt=""/>
              <h3 className={'font-semibold'}>frontend</h3>
            </div>
            <div className="content px-3 text-xs sm:text-sm">
              <div className="content-item">
                <p>熟悉前端工程化开发流程，能够编写页面样式</p>
              </div>
            </div>
            <div className="tech-stack grid grid-cols-3 sm:grid-cols-8 gap-3 p-3 md:grid-cols-10">
              {siteConfig.frontendStack.map((item) => (
                <>
                  <SkillStack stackItem={item}/>
                </>
              ))
              }
            </div>


          </div>
        </div>
        <div className="skill">
          <div className="skill-item p-2 rounded-lg dark:bg-neutral-900 bg-default-100">
            <div className="title flex items-center">
              <img src="/icons/devops.svg" className={'scale-50 size-10'} alt=""/>
              <h3 className={'font-semibold'}>Devops</h3>
            </div>
            <div className="content px-3 text-xs sm:text-sm">
              <div className="content-item">
                <p>熟悉前端工程化开发流程，能够编写页面样式</p>
              </div>
            </div>
            <div className="tech-stack grid grid-cols-3 sm:grid-cols-8 gap-3 p-3 md:grid-cols-10">
              {siteConfig.devopsList.map((item) => (
                <>
                  <SkillStack stackItem={item}/>
                </>
              ))
              }
            </div>


          </div>
        </div>

      </section>
    </DefaultLayout>
  );
}
