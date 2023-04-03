import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { BrowserRouter} from 'react-router-dom'
import ScrollToTop from './helpers/ScrollToTop'

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
      
          <ScrollToTop />
          <App />
       
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
