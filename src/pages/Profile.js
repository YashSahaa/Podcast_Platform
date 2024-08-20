import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { collection, onSnapshot, query } from 'firebase/firestore';
import { setPodcasts } from '../slices/PodcastSlice';
import PodcastCard from '../components/Podcasts/PodcastCard';
import { FaUser } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const podcasts = useSelector((state) => state.podcasts.podcasts);
  const dispatch = useDispatch();

  useEffect(()=>{
      const unsubscribe = onSnapshot(
          query(collection(db,"podcasts")),
          (querySnapshot) =>{
              const podcastsData = [];
              querySnapshot.forEach((doc)=>{
                  podcastsData.push({id: doc.id , ...doc.data()});
              });
              dispatch(setPodcasts(podcastsData));
          },
          (error) =>{
              console.error("Error fetching podcasts:",error);
          }
      );
      return () =>{
          unsubscribe();
      }
  },[dispatch]);

  console.log(user);
  console.log(podcasts);

  if(!user){
    return "Loading...";
  }

  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      toast.success("User Logged Out");
    }).catch((e)=>{
      toast.error(e.message);
    });
  }

  let filteredPodcasts = podcasts.filter((item) => item.createdBy === user.uid);

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        <h1>Profile</h1>
        <div className='profile-details'>
          <div className='profile-pic'>
            {user.profileImage ? (<img src={user.profileImage} className='profile-image'/>):(<FaUser size={35} color='aliceblue'/>)}
          </div>
          <h3>{user.name}</h3>
          <h3>{user.email}</h3>
          <Button text={"Logout"} onClick={handleLogout} style={{width:"100px"}}/>
        </div>
      </div>
      <div className='input-wrapper ' style={{marginTop:"2rem"}}>
        <h1>Your Podcast</h1>
        {filteredPodcasts.length>0 ? (
            <div className='podcast-flex' style={{marginTop:"1.5rem"}}>
                {filteredPodcasts.map((item)=>{
                    return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
                })}
            </div>
        ):(
            <p>No Current Podcast</p>
        )}
      </div>
    </div>
  )
}

export default Profile;
