import { useEffect, useRef } from 'react';

export default function AchievementsPopup({ isOpen, onClose }) {
  const popupRef = useRef(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  // Auto close after one complete loop
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 90000); // 20 seconds

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const achievements = [
    { type: 'event', text: 'ETHGLOBAL SINGAPORE HACKATHON' },
    { type: 'award', text: 'NEAR, WorldCoin Track Winner' },
    { type: 'space' },
    { type: 'event', text: 'THE EIGEN GAMES ETHDENVER' },
    { type: 'award', text: '3rd Place' },
    { type: 'space' },
    { type: 'event', text: 'ETHGLOBAL BANGKOK' },
    { type: 'award', text: 'CDP, Blockscout, Coinbase Winner' },
    { type: 'space' },
    { type: 'event', text: 'BRIDG3 HACKATHON' },
    { type: 'award', text: '3rd Place' },
    { type: 'space' },
    { type: 'event', text: 'ETHKL' },
    { type: 'award', text: 'Finalist + Scroll, Worldcoin, ICP, ORA Winner' },
    { type: 'space' },
    { type: 'event', text: 'DEVMATCH HACKATHON' },
    { type: 'award', text: 'CHAMPION' },
    { type: 'space' },
    { type: 'event', text: 'ETHGLOBAL AGENTIC ETHEREUM' },
    { type: 'award', text: 'Flow Track Champion' },
    { type: 'space' },
    { type: 'event', text: 'CONSENSUS HONG KONG HACKATHON' },
    { type: 'award', text: '3rd Place' },
    { type: 'space' },
    { type: 'event', text: 'ETHGLOBAL TAIPEI' },
    { type: 'award', text: '2nd Place' },
    { type: 'space' },
    { type: 'event', text: 'BUIDL AI HACKATHON SEOUL' },
    { type: 'award', text: 'Champion, NearAI, Gensym, Nethermind Winner' },
    { type: 'space' },
    { type: 'event', text: 'EASYA X RIPPLE APEX SINGAPORE HACKATHON' },
    { type: 'award', text: '2nd Place Exploration Track' },
    { type: 'space' },
    { type: 'event', text: 'HACKINSAN' },
    { type: 'award', text: 'Champion' },
    { type: 'space' },
    { type: 'event', text: 'PAYHACK' },
    { type: 'award', text: '3rd Place' },
    { type: 'space' },
    { type: 'event', text: 'APUBCC BUILDSTATION' },
    { type: 'award', text: '2nd Place' },
    { type: 'space' },
    { type: 'event', text: 'MONASH HACKFEST' },
    { type: 'award', text: 'Consolation' },
    { type: 'space' },
    { type: 'event', text: 'UM DATA SCIENCE DIGITAL RACE' },
    { type: 'award', text: 'Consolation' },
    { type: 'space' },
    { type: 'event', text: 'UITM MINI HACKATHON' },
    { type: 'award', text: '2nd Place' },
    { type: 'space' },
    { type: 'event', text: 'TAR AWARDS 2025' },
    { type: 'award', text: 'Club of the Year' },
    { type: 'space' },
    { type: 'event', text: 'ETHGLOBAL TRIFECTA HACKATHON' },
    { type: 'award', text: '2nd Place' },
    { type: 'space' },
    { type: 'event', text: 'ETHGLOBAL SINGAPORE HACKATHON' },
    { type: 'award', text: 'NEAR, WorldCoin Track Winner' },
    { type: 'space' },
    { type: 'event', text: 'THE EIGEN GAMES ETHDENVER' },
    { type: 'award', text: '3rd Place' },
    { type: 'space' },
    { type: 'event', text: 'ETHGLOBAL BANGKOK' },
    { type: 'award', text: 'CDP, Blockscout, Coinbase Winner' },
    { type: 'space' },
  ];

  const renderAchievement = (achievement, index, prefix = '') => {
    const key = `${prefix}${index}`;
    
    switch (achievement.type) {
      case 'title':
        return (
          <div key={key} className="text-6xl font-bold text-yellow-400 mb-16 text-center">
            {achievement.text}
          </div>
        );
      case 'divider':
        return (
          <div key={key} className="text-4xl font-bold text-yellow-400 mb-12 text-center">
            {achievement.text}
          </div>
        );
      case 'section':
        return (
          <div key={key} className="text-4xl font-bold text-yellow-300 mb-8 text-center">
            {achievement.text}
          </div>
        );
      case 'event':
        return (
          <div key={key} className="text-3xl font-bold text-white mb-3 text-center">
            {achievement.text}
          </div>
        );
      case 'award':
        return (
          <div key={key} className="text-2xl text-yellow-200 mb-2 text-center">
            {achievement.text}
          </div>
        );
      case 'space':
        return <div key={key} className="mb-6"></div>;
      case 'spacer':
        return <div key={key} className="mb-20"></div>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div 
        ref={popupRef}
        className="w-[90vw] h-[90vh] bg-black relative overflow-hidden rounded-lg"
        style={{
          backgroundImage: 'url(/abg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/70 to-black/40"></div>
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-yellow-400 hover:text-yellow-300 text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Credits container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="credits-container w-full h-full flex items-end justify-center">
            <div className="credits-text w-full max-w-4xl px-8">
              {/* First copy */}
              {achievements.map((achievement, index) => renderAchievement(achievement, index, 'first-'))}
              {/* Second copy for seamless loop */}
              {achievements.map((achievement, index) => renderAchievement(achievement, index, 'second-'))}
            </div>
          </div>
        </div>

        <style jsx>{`
          .credits-container {
            mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%);
          }
          
          .credits-text {
            animation: credits-scroll 90s linear infinite;
          }
          
          @keyframes credits-scroll {
            0% {
              transform: translateY(100vh);
            }
            100% {
              transform: translateY(-100%);
            }
          }
        `}</style>
      </div>
    </div>
  );
}
