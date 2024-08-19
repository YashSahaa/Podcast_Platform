import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);

  if(!user){
    return "Loding...";
  }

  const handleLogout = ()=>{
    signOut(auth).then(()=>{
      toast.success("User Logged Out");
    }).catch((e)=>{
      toast.error(e.message);
    });
  }

  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text={"Logout"} onClick={handleLogout}/>
      </div>
    </div>
  )
}

export default Profile;
