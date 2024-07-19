import React from 'react';
function Splash() {
  const welcomeStyle = {
    position: 'relative',
    animation: 'typing 2s steps(10, end) forwards',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    borderRight: '2px solid',
   fontSize:'13pc'
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontFamily: 'serif' }}>
      <a href='/signUp'>
        <h1 style={welcomeStyle}>Welcome</h1>
      </a>
      <style>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
      `}</style>
    </div>
  );
}

export default Splash;
