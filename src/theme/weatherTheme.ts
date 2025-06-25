export const getBackgroundGradient = (condition?: string) => {
  const safe = condition?.toLowerCase?.() ?? '';

  if (!safe) return ['#304352', '#0f2027']; // ✨ dark fallback for initial load

  switch (safe) {
    case 'clear':
      return ['#87CEEB', '#ffffff'];
    case 'clouds':
      return ['#d7d2cc', '#304352'];
    case 'rain':
      return ['#4A6FA5', '#BCC6CC'];
    case 'error':
      return ['#6b7280', '#1f2937'];
    default:
      return ['#ece9e6', '#ffffff'];
  }
};



export const getButtonGradient = (condition?: string): [string, string] => {
  const safe = condition?.toLowerCase?.() ?? '';

  switch (safe) {
    case 'clear':
      return ['#1E90FF', '#0077B6']; // vivid blue for sky
    case 'clouds':
      return ['#5F6C7B', '#2C3E50']; // dark slate for contrast
    case 'rain':
      return ['#3F5EFB', '#5CE1E6']; // electric indigo → aqua
    default:
      return ['#4A90E2', '#145DA0']; // safe sky-blue gradient
  }
};


export const getCardGradient = (condition?: string): [string, string] => {
  const safe = condition?.toLowerCase?.() ?? '';

  switch (safe) {
    case 'clear':
      return ['#56CCF2', '#2F80ED'];
    case 'clouds':
      return ['#bdc3c7', '#2c3e50'];
    case 'rain':
      return ['#4b6cb7', '#182848'];
    default:
      return ['#667db6', '#0082c8'];
  }
};
