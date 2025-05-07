"use client";
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthProvider from "./AuthProvider";
export default function ReduxProvide({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <React.Fragment>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </React.Fragment>
  );
}
