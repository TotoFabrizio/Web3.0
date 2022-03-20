import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap'
import NavBar from './components/navBar/navBar'
import Footer from './components/footer/footer';
import { Switch, Route } from "react-router-dom";
import Login from './components/login/login';
import ethAddressinfo from './components/ethAddressinfo/ethAddressinfo';
import Register from './components/register/register'

function App() {
  return (
    <div id='wrapper'>
      <NavBar />
      <div id='content-wrapper' className='d-flex flex-column'>
        <div id='content'>
          <Switch>
            <Route path='/login' exact={true} component={Login}/>
            <Route path='/register' exact={true} component={Register}/>
            <Route path='/' exact={true} component={ethAddressinfo}/>
          </Switch>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
