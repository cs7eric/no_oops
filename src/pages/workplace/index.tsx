import MagicBento from "@/components/MagicBento";
import Dock from "@/components/Dock";
import { VscHome, VscArchive, VscSmiley, VscSettingsGear } from "react-icons/vsc";
    

const WorkplacePage = () => {

    const items = [
    { icon: <VscHome size={18} />, label: 'Home', onClick: () => alert('Home!') },
    { icon: <VscArchive size={18} />, label: 'Archive', onClick: () => alert('Archive!') },
    { icon: <VscSmiley size={18} />, label: 'Profile', onClick: () => alert('Profile!') },
    { icon: <VscSettingsGear size={18} />, label: 'Settings', onClick: () => alert('Settings!') },
  ];
  return (
        <div className="flex flex-col items-center justify-center">
        <div>WorkplacePage</div>
        <div className="flex items-center justify-center">
            <MagicBento 
                textAutoHide={true}
                enableStars={true}
                enableSpotlight={true}
                enableBorderGlow={true}
                enableTilt={true}
                enableMagnetism={true}
                clickEffect={true}
                spotlightRadius={300}
                particleCount={12}
                glowColor="132, 0, 255"
            />
        </div>
        <Dock 
            className="mb-10"
            items={items}
            panelHeight={68}
            baseItemSize={50}
            magnification={70}
        />
        </div>
  );
};

export default WorkplacePage;