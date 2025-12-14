import LogoLoop from '@/components/LogoLoop';
import { RxGithubLogo } from "react-icons/rx";
import { FaBlog } from "react-icons/fa6";
import { PiWechatLogoFill } from "react-icons/pi";
import { FaTelegram } from "react-icons/fa6";

const techLogos = [
  { node: <FaBlog />, title: "Blog", href: "https://react.dev" },
  { node: <RxGithubLogo />, title: "Github", href: "https://github.com" },
  { node: <PiWechatLogoFill />, title: "WeChat", href: "https://wechat.com" },
  { node: <FaTelegram />, title: "Telegram", href: "https://telegram.com" },
];


const MySite = () => {
  return (
    <div className="flex items-center justify-center" style={{ height: '80px', width: '300px', position: 'relative', overflow: 'hidden'}}>
      <LogoLoop
        logos={techLogos}
        speed={60}
        direction="left"
        logoHeight={30}
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

export default MySite;
