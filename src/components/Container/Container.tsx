import React, { forwardRef } from 'react';
import './Container.css';

interface ContainerProps {
  children: React.ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(({ children, ...props }, ref) => {
  return (
      <div ref={ref} className="Container" {...props}>
        {children}
      </div>
  );
});

export default Container;
