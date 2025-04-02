'use client';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { cn } from '@/utils/functions';

export interface TabProps {
    title: string;
    content: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
    selectedClassName?: string;
    panelClassName?: string;
    panelSelectedClassName?: string;
}

export interface TabsProps {
  tabs: TabProps[];
  className?: string;
  tabListClassName?: string;
  tabClassName?: string;
  tabSelectedClassName?: string;
  tabPanelClassName?: string;
  tabPanelSelectedClassName?: string;
}

export default function TabsComponent({ tabs, className, ...props }: TabsProps) {
  return (
    <Tabs className={cn("w-full", className)}>
      <TabList className={cn("flex overflow-x-auto", props.tabListClassName)}>
        {tabs.map((tab: TabProps, index: number) => (
          <Tab 
            key={index} 
            className={cn(
              "cursor-pointer flex items-center gap-2 font-medium focus-visible:outline-none",
              props.tabClassName,
              tab.className
            )}
            selectedClassName={cn(
              'text-blue-700',
              props.tabSelectedClassName,
              tab.selectedClassName
            )}
          >
            {tab?.icon} {tab.title}
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab: TabProps, index: number) => (
        <TabPanel 
          key={index} 
          className={cn(
            "hidden",
            props.tabPanelClassName,
            tab.panelClassName
          )}
          selectedClassName={cn(
            "!block",
            props.tabPanelSelectedClassName,
            tab.panelSelectedClassName
          )}
        >
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );
}