import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import { useSelector } from "react-redux";
import SignUp from './components/SignUp';



function App() {
  const [loading, setLoading] = useState(true);
  const userId = useSelector(state => state.authentication.id)
  console.log(userId);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json();
        console.log(res.data);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  if (loading) return null;


  return (
    <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <h1>My Home Page</h1>
          </Route>
          <Route path="/login" component={Login}/>
          <Route path="/SignUp" component={SignUp}/>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
