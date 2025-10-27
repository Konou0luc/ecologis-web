import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import './Notification.css';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const Notification: React.FC<NotificationProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    // Animation d'entrée
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Auto-close après la durée spécifiée
    const autoCloseTimer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(autoCloseTimer);
    };
  }, [duration]);

  const handleClose = () => {
    setIsLeaving(true);
    setTimeout(() => {
      onClose(id);
    }, 300);
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'info':
        return <Info size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  return (
    <div 
      className={`notification ${type} ${isVisible ? 'visible' : ''} ${isLeaving ? 'leaving' : ''}`}
      onClick={handleClose}
    >
      <div className="notification-content">
        <div className="notification-icon">
          {getIcon()}
        </div>
        <div className="notification-text">
          <div className="notification-title">{title}</div>
          <div className="notification-message">{message}</div>
        </div>
        <button 
          className="notification-close"
          onClick={(e) => {
            e.stopPropagation();
            handleClose();
          }}
        >
          <X size={16} />
        </button>
      </div>
      <div className="notification-progress">
        <div 
          className="notification-progress-bar"
          style={{
            animation: `notification-progress ${duration}ms linear forwards`
          }}
        />
      </div>
    </div>
  );
};

export default Notification;
