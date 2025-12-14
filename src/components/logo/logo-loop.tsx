import LogoLoop from '@/components/LogoLoop';
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import { DiJava } from "react-icons/di";
import { SiSpring } from "react-icons/si";
import { DiRedis } from "react-icons/di";
import { BiLogoPostgresql } from "react-icons/bi";
import { TbBrandMysql } from "react-icons/tb";

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <DiJava />, title: "Java", href: "https://www.java.com" },
  {
    node: <SiSpring />, title: "Spring", href: "https://spring.io"
  },
  {
    node: <DiRedis />, title: "Redis", href: "https://redis.io"},
  {
    node: <BiLogoPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org"
  },
  {node: <TbBrandMysql />, title: "MySQL", href: "https://www.mysql.com"}
];



const LogoLoopView = () => {
  return (
    <div className="flex items-center justify-center" style={{ height: '60px', position: 'relative', overflow: 'hidden'}}>
      {/* Basic horizontal loop */}
      <LogoLoop
        logos={techLogos}
        speed={160}
        direction="left"
        logoHeight={36}
        gap={40}
        hoverSpeed={0}
        scaleOnHover
        fadeOut={false}
        fadeOutColor="#ffffff"
        ariaLabel="Technology partners"
      />
    </div>
  );
}

export default LogoLoopView;
