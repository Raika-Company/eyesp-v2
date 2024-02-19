/**
 * Calculates the scaling factor based on the current window width.
 * Adjusts the scale for different screen widths.
 * @returns {number} - The calculated scaling factor.
 */
const calculateScale = () => {
  // Get the current window width
  const width = window.innerWidth;

  // Adjust the scale based on different window width ranges
  if (width >= 3000) return 2.2;
  if (width >= 2400) return 2.8;
  if (width >= 2000) return 3.0;
  if (width >= 1400) return 3.4;
  else if (width >= 1000) return 3.8;
  else if (width >= 500) return 4.0;
  else return 4.5;
};

export default calculateScale;
