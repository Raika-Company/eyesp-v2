const calculateScale = () => {
  const width = window.innerWidth;

  if (width >= 3000) return 2;
  if (width >= 2400) return 2.5;
  if (width >= 2000) return 2.8;
  if (width >= 1400) return 3;
  else if (width >= 1000) return 3.5;
  else if (width >= 500) return 3.2;
  else return 3.8;
};

export default calculateScale;
