import React, { useEffect, useRef } from 'react';

const NormalMouse = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.pageX}px`;
        cursorRef.current.style.top = `${e.pageY}px`;
      }
    };

    document.addEventListener('mousemove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-50"
      onClick={() => console.log('Cursor clicked!')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="34"
        height="34"
        fill="none"
        viewBox="0 0 26 31"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          fill="#FFFFFF"
          fillRule="evenodd"
          stroke="#1B1B1B"
          strokeWidth="3"
          d="M21.993 14.425L2.549 2.935l4.444 23.108 4.653-10.002 10.347-1.616Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};

export default NormalMouse;
