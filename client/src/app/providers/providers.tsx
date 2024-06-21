"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WebAppProvider } from "../context";
import { AuthProvider } from "../context/authContext";

interface IPropsProviders {
  children: React.ReactNode;
}

const Providers = ({ children }: IPropsProviders) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WebAppProvider>{children}</WebAppProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Providers;
