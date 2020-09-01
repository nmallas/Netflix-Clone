import React, { useState, useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import MainContent from "./components/MainContent";

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
    authentication: {id: userId}
  });


  // loadUser();

  console.log(store.getState())

  if (loading) return null;



  return (
    <BrowserRouter>
      <Provider store={store}>
        <MainContent/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
