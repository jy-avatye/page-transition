import { ReactNode } from 'react';

interface PageContentProps {
  title: string;
  subtitle: string;
  description: string;
  children?: ReactNode;
}

export const PageContent = ({ title, subtitle, description, children }: PageContentProps) => {
  return (
    <div className="max-w-4xl w-full text-center text-white space-y-8 animate-slide-in">
      <h1 className="text-6xl font-bold mb-6">
        {title}
      </h1>
      <p className="text-2xl mb-8 opacity-90">
        {subtitle}
      </p>
      <p className="text-lg mb-12 opacity-80 max-w-2xl mx-auto">
        {description}
      </p>
      {children && (
        <div className="space-x-4">
          {children}
        </div>
      )}
    </div>
  );
};
