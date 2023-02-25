import React from 'react'
import ReactDOM from 'react-dom/client'
import {RecoilRoot} from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App'

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </QueryClientProvider>
)
