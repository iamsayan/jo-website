'use client';
 
import { ProgressProvider } from '@bprogress/next/app';
import CommandBar from '@/components/command-bar';
 
const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProgressProvider 
        options={{ showSpinner: false }}
        disableStyle
    >
      <CommandBar>
        {children}
      </CommandBar>
    </ProgressProvider>
  );
};
 
export default Providers;