
import './App.css';
import React, { useState, useEffect } from 'react';
import Comingsoon from './components/Comingsoon';
import SplashScreen from './components/SplashScreen';

function App() {
  // State to control whether to show the splash screen or "Coming Soon" page
  const [showSplash, setShowSplash] = useState(true);

  // Use useEffect to automatically hide the splash screen after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3 seconds in milliseconds

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="App">
      {showSplash ? <SplashScreen /> : <Comingsoon />}
    </div>
  );
}

export default App;
