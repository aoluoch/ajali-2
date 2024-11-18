// Theme configuration
export const theme = {
    colors: {
      primary: {
        50: '#fff1f2',
        100: '#ffe4e6',
        200: '#fecdd3',
        300: '#fda4af',
        400: '#fb7185',
        500: '#f43f5e',
        600: '#e11d48',
        700: '#be123c',
        800: '#9f1239',
        900: '#881337',
        950: '#4c0519',
      }
    }
  };
  
  // Common button styles
  export const buttonStyles = {
    base: 'font-semibold rounded-lg transition-colors duration-200 flex items-center justify-center',
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2',
    danger: 'bg-primary-500 text-white hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    success: 'bg-green-500 text-white hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
    warning: 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
  };
  
  // Common input styles
  export const inputStyles = {
    base: 'block w-full rounded-lg border-gray-300 shadow-sm transition-colors duration-200',
    focus: 'focus:border-primary-500 focus:ring-primary-500',
    error: 'border-primary-500 focus:border-primary-500 focus:ring-primary-500',
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }
  };
  
  // Common card styles
  export const cardStyles = {
    base: 'bg-white rounded-lg shadow-md overflow-hidden',
    hover: 'hover:shadow-lg transition-shadow duration-200',
    padding: {
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    }
  };