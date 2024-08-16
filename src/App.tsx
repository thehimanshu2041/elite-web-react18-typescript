import { Route, Routes, useLocation } from 'react-router';
import './App.css';
import NavBar from './components/nav-bar/NavBar';
import { Grow } from '@mui/material'; import routes from './routes/routes';
import ThemeConfig from './theme';
import { useAuth } from './contexts/AuthContext';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/snackbarUtils';
import loadingStore from './stores/loading';
import Loader from './components/loader/Loader';
import Login from './pages/auth/login/login';

function App() {

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const { isAuthenticated } = useAuth();
  const { isloading } = loadingStore;


  return (
    <>
      <SnackbarProvider
        maxSnack={4}
        autoHideDuration={3000}
        TransitionComponent={Grow}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        <SnackbarUtilsConfigurator />
        {isloading && <Loader />}
        {isAuthenticated && (
          <ThemeConfig>
            <NavBar>
              <Routes location={backgroundLocation || location}>
                {routes.map((r, i) => (
                  <Route key={i} path={r.path}
                    element={<r.element />}
                  />
                ))}
              </Routes>
            </NavBar>
          </ThemeConfig>
        )}

        {!isAuthenticated && (
          <ThemeConfig>
            <Login />
          </ThemeConfig>
        )}
      </SnackbarProvider>
    </>
  );
}

export default App;
