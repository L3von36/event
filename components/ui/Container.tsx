import React, { HTMLAttributes } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Container = ({ className = '', children, ...props }: ContainerProps) => {
  return (
    <div 
      className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};

export default Container;
