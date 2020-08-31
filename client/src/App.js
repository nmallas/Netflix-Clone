import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json();
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  if (loading) return null;

  return (
    <BrowserRouter>
      <Route path="/">
        <h1>My Home Page</h1>
      </Route>
    </BrowserRouter>
  );
}

export default App;
