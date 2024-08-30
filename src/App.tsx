import { Route, Routes, useLocation } from 'react-router';
import NavBar from './components/nav-bar/nav';
import { Grow } from '@mui/material';
import authRoutes from './routes/auth';
import ThemeConfig from './theme';
import { useAuth } from './contexts/auth-context';
import { SnackbarProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from './utils/snackbar';
import loadingStore from './stores/loading';
import Loader from './components/loader';
import { observer } from 'mobx-react';
import NotFound from './pages/not-found';
import routes from './routes';


function App() {

  const location = useLocation();
  const backgroundLocation = location.state?.backgroundLocation;
  const { isAuthenticated, user } = useAuth();
  const { isloading } = loadingStore;

  const isRoleContained = (jwtRoles: string[], routerRoles: string[]): boolean => {
    return routerRoles.some(item => jwtRoles.includes(item));
  };

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
                {authRoutes.map((r, i) => (
                  <Route key={i} path={r.path}
                    element={isRoleContained(user?.roles ?? [], r.permissions) ? <r.element /> : <NotFound />}
                  />
                ))}
              </Routes>
            </NavBar>
          </ThemeConfig>
        )}

        {!isAuthenticated && (
          <ThemeConfig>
            <Routes location={backgroundLocation || location}>
              {routes.map((r, i) => (
                <Route key={i} path={r.path} element={<r.element />} />
              ))}
            </Routes>
          </ThemeConfig>
        )}
      </SnackbarProvider>
    </>
  );
}

export default observer(App);