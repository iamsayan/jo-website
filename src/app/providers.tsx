'use client';
 
import { ProgressProvider } from '@bprogress/next/app';
 
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider 
        height="2px"
        color="#eab308"
        options={{ showSpinner: false }}
        shallowRouting
    >
      {children}
    </ProgressProvider>
  );
};
 
export default Providers;