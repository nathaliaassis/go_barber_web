import React from 'react';
import GlobalStyle from './styles/global';
import { BrowserRouter } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

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
