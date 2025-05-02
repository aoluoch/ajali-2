import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary-600 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
    </div>
  );
};

export default LoadingSpinner;