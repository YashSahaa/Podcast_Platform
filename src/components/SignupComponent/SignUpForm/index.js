import React, { useEffect, useState } from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { auth, db, storage } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FileInput from '../../common/Input/FileInput';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const SignUpForm = () => {
  const [fullName,setFullName] = useState("") ;
  const [email,setEmail] = useState("") ;
  const [password,setPassword] = useState("") ;
  const [confirmPassword,setConfirmPassword] = useState("") ;
  const [profileImage,setProfileImage] = useState();
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch(); 


  const handleSignup = async()=>{

    setLoading(true);

    if(password===confirmPassword && password.length>=6 && fullName && email){
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        console.log(user);

        const profileImageRef = ref(storage,`profilepic/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(profileImageRef,profileImage);
        const profileImageUrl = await getDownloadURL(profileImageRef);

        console.log("fullname==>",fullName);
        await setDoc(doc(db,"users",user.uid),{
          name: fullName,
          email: user.email,
          uid: user.uid,
          profileImage: profileImageUrl,
        });

        dispatch(setUser({
          name: fullName,
          email: user.email,
          uid: user.uid,
          profileImage: profileImageUrl,
        }));

        setProfileImage(null);
        setLoading(false);
        toast.success("User has been created");
        
        navigate("/profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      setLoading(false);
      if(password!=confirmPassword){
        toast.error("Password and Confirm password cannot be different");
      }
      else if(password.length<6){
        toast.error("Password length cannot be less then 6");
      }
      else{
        toast.error("All fields are mandatory");
      }
    }
  }

  const profileImageFileHandle = (file) =>{
    setProfileImage(file);
  }

  
  return (
    <>
        <InputComponent type="text" state={fullName} setState={setFullName} placeholder="Full Name" required={true}/>
        <InputComponent type="email" state={email} setState={setEmail} placeholder="Email" required={true}/>
        <InputComponent type="password" state={password} setState={setPassword} placeholder="Password" required={true}/>
        <InputComponent type="password" state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" required={true}/>
        <FileInput accept={"image/*"} id={"profile-image-input"} fileHandleFunc={profileImageFileHandle} text={"Upload Profile Image"}/>
        <Button text={loading?"Loading...":"SignUp"} disabled={loading} onClick={handleSignup}/>
    </>
  )
}

export default SignUpForm;
