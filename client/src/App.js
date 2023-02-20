import './App.css';
import Navbar from './components/ui/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import { Outlet } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ScrollToTop from './components/ScrollTop';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <ScrollToTop />
        <Navbar />
        <Outlet />
      </AuthContextProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
