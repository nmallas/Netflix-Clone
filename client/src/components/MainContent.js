import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from './Login';
import SignUp from './SignUp';
import Home from './Home';

export default function MainContent() {

    const userId = useSelector((state) => state.authentication.id);
    console.log(userId);

    const ProtectedRoute = ({path, component, exact}) => {
        if(!userId ) {
          return <Redirect to="/login"/>
        } else {
          return (
            <Route exact={exact} path={path} component={component}/>
          )
        }
    }

    return (
        <Switch>
          <ProtectedRoute exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route path="/SignUp" component={SignUp}/>
        </Switch>
    )
}
