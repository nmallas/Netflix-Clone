import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  console.log(userId);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json();
        setUserId(res.data.user.id);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  let store = configureStore({
    authentication: userId
  });

  if (loading) return null;

  console.log(store.getState())
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <h1>My Home Page</h1>
          </Route>
          <Route exact path="/login" component={Login}/>
          <Route path="/SignUp" component={SignUp}/>
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
