import React from 'react';
import Notification, { NotificationProps } from './Notification';

interface NotificationContainerProps {
  notifications: Array<{
    id: string;
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    message: string;
    duration?: number;
  }>;
  onRemove: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationContainerProps> = ({
  notifications,
  onRemove
}) => {
  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          style={{
            position: 'relative',
            zIndex: 1000 - index,
            transform: `translateY(${index * 10}px)`,
          }}
        >
          <Notification
            id={notification.id}
            type={notification.type}
            title={notification.title}
            message={notification.message}
            duration={notification.duration}
            onClose={onRemove}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
