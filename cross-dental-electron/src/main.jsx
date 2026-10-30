import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import { theme } from './styles/theme.js';
import App from './components/App.jsx';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${props => props.theme.colors.bgCard};
    color: ${props => props.theme.colors.textMain};
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
  }

  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  .toast-notification {
    animation: slideIn 0.3s ease-out forwards;
  }
`;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);