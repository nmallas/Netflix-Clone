import React, { useState, useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import MainContent from "./components/MainContent";

function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);

  useEffect(() => {
    const loadUserData = async () => {
      const res = await fetch("/api/session");
      if (res.ok) {
        res.data = await res.json();
        setUserId(res.data.user.id);
        setUserEmail(res.data.user.email);
      }
      const profileRes = await fetch(`/api/profiles/${res.data.user.id}`);
        if(profileRes.ok) {
          let profiles = await profileRes.json();
          setCurrentProfile(profiles.length ? profiles[0] : {});
          setAllProfiles(profiles);
        }
      setLoading(false);
    }
    loadUserData();
  }, []);


  let store = configureStore({
    authentication: {id: userId, email: userEmail},
    profiles: {current: currentProfile, all: allProfiles},
    watchList: []
  });


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
