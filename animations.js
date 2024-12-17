// For radar animation
const createRadarEffect = () => {
    gsap.to('.radar-sweep', {
      rotation: 360,
      duration: 3,
      repeat: -1,
      ease: 'linear'
    });
  }
  
  // For speedometer updates
  const updateSpeedometer = (speed) => {
    const indicator = document.querySelector('.speed-indicator');
    indicator.classList.remove('speed-safe', 'speed-warning', 'speed-danger');
    
    if (speed <= 50) indicator.classList.add('speed-safe');
    else if (speed <= 70) indicator.classList.add('speed-warning');
    else indicator.classList.add('speed-danger');
  }