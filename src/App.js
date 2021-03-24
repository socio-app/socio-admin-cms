import './App.css';
import './index.css'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login/Login.js'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
