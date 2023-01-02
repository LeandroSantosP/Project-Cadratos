import './shared/forms/TranslantYup';
import { AppRoutes } from './routes';
import { BrowserRouter } from 'react-router-dom'
import { MenuLateral } from './shared/components';
import { AuthProvider } from './shared/contexts/AuthCotext';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';

function App() {

  return (
    <AppThemeProvider>
      <AppDrawerProvider>
        <AuthProvider>

          <BrowserRouter>

            <MenuLateral>
              <AppRoutes />
            </MenuLateral>

          </BrowserRouter>

        </AuthProvider>
      </AppDrawerProvider>
    </AppThemeProvider>
  )
}

export default App;
