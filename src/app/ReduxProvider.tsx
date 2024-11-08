"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  let reduxPersistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
