import './shared/forms/TranslantYup';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom'
import { MenuLateral } from './shared/components';
import { AuthProvider } from './shared/contexts/AuthCotext';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';
import { LoginAuth } from './pages/Login/LoginAuth';

function App() {

  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <AuthProvider>
          <LoginAuth>

            <BrowserRouter>

              <MenuLateral>
                <AppRoutes />
              </MenuLateral>

            </BrowserRouter>

          </LoginAuth>
        </AuthProvider>
      </AppDrawerProvider>
    </AppThemeProvider>
  )
}

export default App;
