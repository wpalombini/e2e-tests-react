import React, { createContext, ReactNode, useState } from 'react';

export enum NotificationType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
  Info = 'info',
}

export class UXNotification {
  public type: NotificationType = NotificationType.Success;
  public message = 'Success';
}

export interface IUXContext {
  isSideMenuOpen: boolean;
  setIsSideMenuOpen: (val: boolean) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  notification: UXNotification | null;
  setNotification: (notification: UXNotification | null) => void;
}

export interface IUXProps {
  children: ReactNode;
}

export const UXContext = createContext<IUXContext>({} as IUXContext);

export const UXProvider: (props: IUXProps) => JSX.Element = (props: IUXProps): JSX.Element => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState<UXNotification | null>(null);

  const uxContext: IUXContext = {
    isSideMenuOpen: isSideMenuOpen,
    setIsSideMenuOpen: setIsSideMenuOpen,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    isLoggedIn: isLoggedIn,
    setIsLoggedIn: setIsLoggedIn,
    notification: notification,
    setNotification: setNotification,
  };

  return <UXContext.Provider value={uxContext}>{props.children}</UXContext.Provider>;
};
