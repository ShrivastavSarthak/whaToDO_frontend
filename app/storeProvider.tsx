"use client";

import store from "@/shared/store/store";
import { Provider } from "react-redux";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "sonner";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persister = persistStore(store);
  return (
    <Provider store={store}>
      {" "}
      <PersistGate persistor={persister} loading={null}>
        {children}
        
      </PersistGate>
    </Provider>
  );
}
