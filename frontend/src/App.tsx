import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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
    </QueryClientProvider>
  )
}

