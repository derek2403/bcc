import { useEffect, useRef } from 'react';

export default function Colab({ isOpen, onClose }) {
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div 
        ref={popupRef}
        className="w-[90vw] h-[90vh] bg-black relative overflow-hidden rounded-lg"
        style={{
          backgroundImage: 'url(/cbg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 text-yellow-400 hover:text-yellow-300 text-2xl font-bold transition-colors"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
