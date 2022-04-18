import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { useTimeoutFn, useUpdateEffect } from 'react-use';

import {
  CheckCircledIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons';
import { motion, useIsPresent, Variants } from 'framer-motion';
import { useDispatch } from 'react-redux';
import {
  dismissNotification,
  NotificationPositions,
  useNotificationDuration,
  useNotificationPosition,
} from '../notificationSlice';
import { usePrefersReducedMotion } from '../../../app/hooks';
import styles from './NotificationItem.module.css';

export type NotificationTypes = 'success' | 'error' | 'warning' | 'info';

export type Notification = {
  /**
   * The notification id.
   */
  id: string;

  /**
   * The message of the notification
   */
  message: string;

  /**
   * An optional dismiss duration time
   *
   * @default 6000
   */
  autoHideDuration?: number;

  /**
   * The type of notification to show.
   */
  type?: NotificationTypes;

  /**
   * Optional callback function to run side effects after the notification has closed.
   */
  onClose?: () => void;

  /**
   * Optionally add an action to the notification through a ReactNode
   */
  action?: ReactNode;
};

type Props = {
  notification: Notification;
};

/**
 * To handle different positions of the notification, we need to change the
 * animation direction based on whether it is rendered in the top/bottom or left/right.
 *
 * @param position - The position of the Notification
 * @param fromEdge - The length of the position from the edge in pixels
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const getMotionDirectionAndPosition = (
  position: NotificationPositions,
  fromEdge = 24
) => {
  const directionPositions: NotificationPositions[] = ['top', 'bottom'];
  const factorPositions: NotificationPositions[] = [
    'top-right',
    'bottom-right',
  ];

  const direction = directionPositions.includes(position) ? 'y' : 'x';
  let factor = factorPositions.includes(position) ? 1 : -1;

  if (position === 'bottom') factor = 1;

  return {
    [direction]: factor * fromEdge,
  };
};

const motionVariants: Variants = {
  initial: (position: NotificationPositions) => {
    return {
      opacity: 0,
      ...getMotionDirectionAndPosition(position),
    };
  },
  animate: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (position) => {
    return {
      opacity: 0,
      ...getMotionDirectionAndPosition(position, 30),
      transition: {
        duration: 0.2,
        ease: [0.4, 0, 1, 1],
      },
    };
  },
};

const notificationStyleVariants: Record<
  NonNullable<Notification['type']>,
  string
> = {
  success: styles.success,
  error: styles.error,
  info: styles.info,
  warning: styles.warning,
};

const notificationIcons: Record<
  NonNullable<Notification['type']>,
  ReactNode
> = {
  success: <CheckCircledIcon />,
  error: <ExclamationTriangleIcon />,
  info: <InfoCircledIcon />,
  warning: <ExclamationTriangleIcon />,
};

const closeButtonStyleVariants: Record<
  NonNullable<Notification['type']>,
  string
> = {
  success: 'hover:bg-green-5 active:bg-green-6',
  error: 'hover:bg-red-5 active:bg-red-6',
  info: 'hover:bg-purple-5 active:bg-purple-6',
  warning: 'hover:bg-yellow-5 active:bg-yellow-6',
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const NotificationItem = ({
  notification: { id, autoHideDuration, message, onClose, type = 'info' },
}: Props) => {
  const dispatch = useDispatch();
  const duration = useNotificationDuration();
  const isPresent = useIsPresent();
  const position = useNotificationPosition();
  const prefersReducedMotion = usePrefersReducedMotion();

  // Handle dismiss of a single notification
  const handleDismiss = (): void => {
    if (isPresent) {
      dispatch(dismissNotification(id));
    }
  };

  // Call the dismiss function after a certain timeout
  const [, cancel, reset] = useTimeoutFn(
    handleDismiss,
    autoHideDuration ?? duration
  );

  // Reset or cancel dismiss timeout based on mouse interactions
  const onMouseEnter = (): void => cancel();
  const onMouseLeave = (): void => reset();

  // Call `onDismissComplete` when notification unmounts if present
  useUpdateEffect(() => {
    if (!isPresent) {
      onClose?.();
    }
  }, [isPresent]);

  return (
    <motion.li
      className={notificationStyleVariants[type]}
      initial="initial"
      animate="animate"
      exit="exit"
      layout="position"
      custom={position}
      variants={!prefersReducedMotion ? motionVariants : {}}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex gap-2 items-center">
        {notificationIcons[type]}
        <span className="max-w-sm font-medium">{message}</span>
      </div>

      <div className="pl-4 ml-auto">
        <button
          onClick={handleDismiss}
          className={clsx(
            'p-1 rounded transition-colors duration-100',
            closeButtonStyleVariants[type]
          )}
        >
          <Cross2Icon />
        </button>
      </div>
    </motion.li>
  );
};
