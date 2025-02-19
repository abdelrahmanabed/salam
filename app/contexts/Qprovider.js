'use client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 60, // Data stays fresh for 1 hour
        cacheTime: 1000 * 60 * 60 * 24, // Cache persists for 24 hours
      },
    },
  });
const Qprovider = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>

{children}</QueryClientProvider>
  )
}

export default Qprovider