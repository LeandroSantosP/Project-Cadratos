import './shared/forms/TranslantYup';
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes';
import { MenuLateral } from './shared/components';
import { AppDrawerProvider, AppThemeProvider } from './shared/contexts';

function App() {

  return (
    <AppThemeProvider>
      <AppDrawerProvider>

        <BrowserRouter>
        
        <MenuLateral>
          <AppRoutes />
        </MenuLateral>

        </BrowserRouter>
        
      </AppDrawerProvider>
    </AppThemeProvider>
  )
}

export default App;
