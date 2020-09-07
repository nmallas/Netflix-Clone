import React, { useState, useEffect } from 'react';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import MainContent from "./components/MainContent";
import profile from './store/profileReducer';

function App() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [currentProfile, setCurrentProfile] = useState(null);
  const [allProfiles, setAllProfiles] = useState([]);
  const [watchList, setWatchList] = useState([])

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
          if(profiles.length) {
            let profileId = profiles[0].id
            const watchListRes = await fetch(`api/watchlists/${profileId}`);
            if(watchListRes.ok) {
              let currentWatchList = await watchListRes.json();
              setWatchList(currentWatchList);
            }
          }
      }
      // wasn't working
      // maybe use selector on home page
      // const watchListRes = await fetch(`api/watchlists/${currentProfile}`);
      //   if(watchListRes.ok) {
      //     let currentWatchList = await watchListRes.json();
      //     setWatchList(currentWatchList);
      //   }
      setLoading(false);
    }
    loadUserData();
  }, []);


  let store = configureStore({
    authentication: {id: userId, email: userEmail},
    profiles: {current: currentProfile, all: allProfiles},
    watchList
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
