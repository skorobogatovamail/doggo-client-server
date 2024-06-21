import Loader from "@/components/Loader";
import React, { createContext, useEffect, useRef, useState } from "react";
import type { TelegramWebApps } from "telegram-webapps-types-new";

interface IProps {
  children: React.ReactNode;
}

type AppContext = {
  appRef: React.MutableRefObject<TelegramWebApps.WebApp>;
  ready: boolean;
};

export const webAppContext = createContext<AppContext>({
  appRef: { current: {} } as React.MutableRefObject<TelegramWebApps.WebApp>,
  ready: false,
});

export const WebAppProvider = ({ children }: IProps) => {
  // const [app, setApp] = useState({} as TelegramWebApps.WebApp);
  const appRef = useRef<TelegramWebApps.WebApp>({} as TelegramWebApps.WebApp);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    appRef.current = window.Telegram.WebApp;
    const webApp = appRef.current; //window.Telegram.WebApp
    webApp.ready();
    webApp.setHeaderColor("#FF7F22");
    webApp.expand();
    webApp.BackButton.hide();
    setReady(true);
    // setApp(webApp);
  }, []);

  // useEffect(() => {
  //     if (!app) return;
  //     if (app.ready) app.ready();
  // }, [app]);

  return (
    <webAppContext.Provider value={{ appRef, ready }}>
      {ready ? children : <Loader />}
    </webAppContext.Provider>
  );
};

// export const useWebApp = (): TelegramWebApps.WebApp => {

// }
