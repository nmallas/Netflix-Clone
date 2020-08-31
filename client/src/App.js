import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json();
      } else {
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
      </Switch>
    </BrowserRouter>
  );
}

export default App;
