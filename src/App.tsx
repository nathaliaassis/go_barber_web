import React from 'react';
import GlobalStyle from './styles/global';
import { BrowserRouter } from 'react-router-dom';

import AppProvider from './hooks';
import Routes from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppProvider>

          <Routes />
        </AppProvider>
        <GlobalStyle />
      </BrowserRouter>
    </>
  );
}

export default App;
