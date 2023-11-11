"use-client";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

type TrainPageProps = { children: React.ReactNode };

const TrainPage = ({ children }: TrainPageProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TrainPage;
