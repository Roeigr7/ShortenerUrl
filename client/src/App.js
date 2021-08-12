import './App.css';
import MainNavbar from './components/MainNavbar';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotFoundPage from './pages/NotFoundPage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignPage from './pages/SignPage';
import Footer from './components/Footer';

const App = () => {
  const { isAuth } = useSelector((state) => state.auth.user);

  return (
    <>
      <div className='App'>
        <Router>
          <MainNavbar />
          <Switch>
            <Route exact path='/'>
              <HomePage />
            </Route>
            <Route exact path='/login'>
              {!isAuth ? <SignPage /> : <Redirect to='/' />}
            </Route>
            <Route exact path='/register'>
              {!isAuth ? <SignPage /> : <Redirect to='/' />}
            </Route>
            <Route path='/admin'>
              {isAuth ? <AdminPage /> : <Redirect to='/' />}
            </Route>
            <Route path='*'>
              <NotFoundPage />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </>
  );
};

export default App;
