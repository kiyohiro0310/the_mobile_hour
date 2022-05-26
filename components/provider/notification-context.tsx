import React, { createContext, useEffect, useState } from 'react'
import { DataType } from '../../Model/Types';

interface TypeProps {
    children: React.ReactNode
}

const NotificationContext = createContext({
    notification: null,
    showNotification: (data: DataType)=> {}
});

export const NotificationContextProvider: React.FC<TypeProps> = (props) => {
    const [activeNotification, setActiveNotification] = useState<any>(null);

    useEffect(() => {
        if(activeNotification && (activeNotification.status === "success" || activeNotification.status === "error" || activeNotification.status === "pending" || activeNotification.status === "checkout")) {
            const timer = setTimeout(() => {
                setActiveNotification(null);
            }, 3000)

            return () => {
                clearTimeout(timer);
            };
        }

    }, [activeNotification]);

    function showNotificationHandler(data: DataType) {
        setActiveNotification(data);
    }

    const context = {
        notification: activeNotification,
        showNotification: showNotificationHandler
    }
  return (
      <NotificationContext.Provider value={context}>
          {props.children}
      </NotificationContext.Provider>
  )
}

export default NotificationContext;