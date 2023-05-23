import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'

import Home from './components/Home'
import NotFound from './components/Notfound'

import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route component={NotFound} />
  </Switch>
)

export default App
