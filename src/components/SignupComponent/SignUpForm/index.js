import React, { useState } from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { auth, db } from '../../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const [fullName,setFullName] = useState("") ;
  const [email,setEmail] = useState("") ;
  const [password,setPassword] = useState("") ;
  const [confirmPassword,setConfirmPassword] = useState("") ;
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

        await setDoc(doc(db,"users",user.uid),{
          name: fullName,
          email: user.email,
          uid: user.uid,
        });

        dispatch(setUser({
          name: fullName,
          email: user.email,
          uid: user.uid,
        }));

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
  
  return (
    <>
        <InputComponent type="text" state={fullName} setState={setFullName} placeholder="Full Name" required={true}/>
        <InputComponent type="email" state={email} setState={setEmail} placeholder="Email" required={true}/>
        <InputComponent type="password" state={password} setState={setPassword} placeholder="Password" required={true}/>
        <InputComponent type="password" state={confirmPassword} setState={setConfirmPassword} placeholder="Confirm Password" required={true}/>
        <Button text={loading?"Loading...":"SignUp"} disabled={loading} onClick={handleSignup}/>
    </>
  )
}

export default SignUpForm;
