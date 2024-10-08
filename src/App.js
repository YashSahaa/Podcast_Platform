import {BrowserRouter as Router, Route,  Routes } from 'react-router-dom';
import './App.css';
import SignUpOrIn from './pages/SignUpOrIn';
import Profile from './pages/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/common/PrivateRoutes';
import CreateAPodcast from './pages/CreateAPodcast';
import Podcasts from './pages/Podcasts';
import PodcastDetails from './pages/PodcastDetails';
import CreateAnEpisode from './pages/CreateAnEpisode';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribeSnapshot = onSnapshot(
          doc(db,"users",user.uid),
          (userDoc) =>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(setUser({
                name: userData.fullName,
                email: userData.email,
                uid: user.uid,
              }));
            }
          },
          (error)=>{
            console.log(error);
          }
        );
        return () =>{
          unsubscribeSnapshot();
        };
      }
    });

    return () =>{
      unsubscribeAuth();
    }
  },[]);

  return (
    <div className="App">
      <ToastContainer/>
      <Router>
          <Routes>
            <Route path='/' element={<SignUpOrIn/>}/>
            <Route element={<PrivateRoutes/>}>
              <Route path='/profile' element={<Profile/>}/>
              <Route path='/create-a-podcast' element={<CreateAPodcast/>}/>
              <Route path='/podcasts' element={<Podcasts/>}/>
              <Route path='/podcast/:id' element={<PodcastDetails/>}/>
              <Route path='/podcast/:id/create-episode' element={<CreateAnEpisode/>}/>
            </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
