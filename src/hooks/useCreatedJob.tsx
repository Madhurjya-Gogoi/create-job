import { createContext, useContext, useState, ReactNode } from 'react';

type CreatedJobContextType = {
  isJobCreated: boolean;
  setIsJobCreated: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatedJobContext = createContext<CreatedJobContextType | undefined>(undefined);

type JobCreatedProviderProps = {
  children: ReactNode;
};

export const JobCreatedProvider: React.FC<JobCreatedProviderProps> = ({ children }) => {
  const [isJobCreated, setIsJobCreated] = useState<boolean>(false);

  const value: CreatedJobContextType = {
    isJobCreated,
    setIsJobCreated,
  };

  return <CreatedJobContext.Provider value={value}>{children}</CreatedJobContext.Provider>;
};

export const useJobCreatedContext = (): CreatedJobContextType => {
  const context = useContext(CreatedJobContext);
  if (!context) {
    throw new Error('useJobCreatedContext must be used within a JobCreatedProvider');
  }
  return context;
};
