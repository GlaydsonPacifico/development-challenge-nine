import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from "react-hot-toast";
import { Router } from "./routers";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

export function App() {
  return (
    <QueryClientProvider client={queryClient} >
      <Router />
      <Toaster
        position="top-center"
      />
      <ReactQueryDevtools buttonPosition="bottom-left" position="bottom" />
    </QueryClientProvider>
  )
}

