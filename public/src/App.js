import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import './index.css';
import Dashboard from './components/dashBoard/DashBoard';
import News from './components/news/News';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ViewUser from './components/dashBoard/ViewUser';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import Forgot from './components/auth/Forgot';
import Chat from './components/chat/Chat';
import Profile from './components/profile/Profile';
import Update from './components/profile/editSidebar/Update';
import 'tachyons';
import ChatList from './components/chat/ChatList';

function App() {
  return (
    <BrowserRouter>
      <div>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/news" component={News} />
            <Route path="/viewuser/:id" component={ViewUser} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/forgot" component={Forgot} />
            <Route path="/chat" component={Chat} />
            <Route path="/chatlist/:id" component={ChatList} />
            <Route path="/profile" component={Profile} />
            <Route path="/update/:id" component={Update} />
          </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
