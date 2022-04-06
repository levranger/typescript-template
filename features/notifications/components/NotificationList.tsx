import type { FC, ReactNode } from 'react';
import React from 'react';
import * as Portal from '@radix-ui/react-portal';
import { AnimatePresence, AnimateSharedLayout } from 'framer-motion';

type Props = {
  children: ReactNode;
};

export const NotificationList: FC = ({ children }: Props) => {
  return (
    <Portal.Root style={{ position: 'fixed' }}>
      <AnimateSharedLayout>
        <ul
          aria-live="assertive"
          className="flex fixed z-50 flex-col gap-4 m-4 lg:m-8 pointer-events-none"
        >
          <AnimatePresence initial={false}>{children}</AnimatePresence>
        </ul>
      </AnimateSharedLayout>
    </Portal.Root>
  );
};
