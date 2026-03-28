"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthBootstrapper from "@/components/auth/AuthBootstrapper"; 

export default function ReduxProvider({
  children,
  authed,
}: {
  children: React.ReactNode;
  authed: boolean;
}) {
  return (
    <Provider store={store}>
      <AuthBootstrapper authed={authed} />
      {children}
    </Provider>
  );
}