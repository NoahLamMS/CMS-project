import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import QueryProvider from './app/providers/QueryProvider';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <QueryProvider>
      <App />
    </QueryProvider>
  </BrowserRouter>
);
