"use client";

import { store } from "@/store/store";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  let reduxPersistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* persist gate slows refresh by 3 SECONDS */}
      {/* <PersistGate loading={null} persistor={reduxPersistor}> */}
      {children}
      {/* </PersistGate> */}
    </Provider>
  );
};

export default ReduxProvider;
