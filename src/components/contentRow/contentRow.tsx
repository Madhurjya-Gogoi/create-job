import React, { ReactNode } from 'react';

interface ContentRowProps {
  children: ReactNode;
}

const ContentRow: React.FC<ContentRowProps> = ({ children }) => {
  return <div className="flex flex-row gap-[8px]">{children}</div>;
};

export default ContentRow;
