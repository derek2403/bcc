import { useEffect, useRef, useState } from 'react';

export default function OurFocusPopup({ isOpen, onClose }) {
  const popupRef = useRef(null);
  const [activeSidebar, setActiveSidebar] = useState(null); // 'trading' or 'developer'

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

  // Reset sidebar when popup closes
  useEffect(() => {
    if (!isOpen) {
      setActiveSidebar(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLeftClick = () => {
    setActiveSidebar('trading');
  };

  const handleRightClick = () => {
    setActiveSidebar('developer');
  };

  const handleEmptySpaceClick = () => {
    setActiveSidebar(null);
  };

  const tradingEvents = {
    past: [
      'Crypto Trading Bootcamp 2024',
      'DeFi Strategy Workshop',
      'Trading Psychology Seminar',
      'Risk Management Masterclass',
      'Blockchain Networking Mixer',
      'Crypto Community Meetup',
      'Trading & Investment Forum'
    ],
    upcoming: [
      'Advanced Trading Strategies',
      'Market Analysis Workshop',
      'Portfolio Optimization Seminar',
      'Algorithmic Trading Course',
      'Web3 Networking Night',
      'Investor Connect Event',
      'Trading Community Gathering'
    ]
  };

  const developerEvents = {
    past: [
      'Smart Contract Development Workshop',
      'Web3 Frontend Bootcamp',
      'Solidity Fundamentals Course',
      'DApp Architecture Seminar'
    ],
    upcoming: [
      'Advanced React for Web3',
      'Blockchain Security Workshop',
      'Cross-chain Development',
      'Smart Contract Auditing Course'
    ]
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div 
        ref={popupRef}
        className="w-[90vw] h-[90vh] bg-black relative overflow-hidden rounded-lg"
        style={{
          backgroundImage: 'url(/fbg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-yellow-400 hover:text-yellow-300 text-2xl font-bold transition-colors"
        >
          ✕
        </button>

        {/* Left clickable area */}
        <div 
          className="absolute left-0 top-0 w-1/2 h-full cursor-pointer z-20"
          onClick={handleLeftClick}
        >
        </div>

        {/* Right clickable area */}
        <div 
          className="absolute right-0 top-0 w-1/2 h-full cursor-pointer z-20"
          onClick={handleRightClick}
        >
        </div>

        {/* Empty space clickable area - only when sidebar is active */}
        {activeSidebar && (
          <div 
            className="absolute inset-0 cursor-pointer z-25"
            onClick={handleEmptySpaceClick}
          >
          </div>
        )}

        {/* Trading Sidebar - slides from left */}
        <div className={`absolute left-0 top-0 h-full w-96 bg-gray-900 bg-opacity-95 transform transition-transform duration-300 z-30 ${
          activeSidebar === 'trading' ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Trading and Networking Events</h2>
              <button 
                onClick={() => setActiveSidebar(null)}
                className="text-yellow-400 hover:text-yellow-300 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Past:</h3>
                <ul className="space-y-2">
                  {tradingEvents.past.map((event, index) => (
                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-yellow-400">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming:</h3>
                <ul className="space-y-2">
                  {tradingEvents.upcoming.map((event, index) => (
                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-green-400">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Sidebar - slides from right */}
        <div className={`absolute right-0 top-0 h-full w-96 bg-gray-900 bg-opacity-95 transform transition-transform duration-300 z-30 ${
          activeSidebar === 'developer' ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6 h-full overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-yellow-400">Developer Oriented Events</h2>
              <button 
                onClick={() => setActiveSidebar(null)}
                className="text-yellow-400 hover:text-yellow-300 text-xl"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Past:</h3>
                <ul className="space-y-2">
                  {developerEvents.past.map((event, index) => (
                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-yellow-400">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Upcoming:</h3>
                <ul className="space-y-2">
                  {developerEvents.upcoming.map((event, index) => (
                    <li key={index} className="text-gray-300 pl-4 border-l-2 border-green-400">
                      {event}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 