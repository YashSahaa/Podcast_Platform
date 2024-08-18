import React, { useState } from 'react';
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../slices/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const [email,setEmail] = useState("") ;
  const [password,setPassword] = useState("") ;
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async()=>{
    setLoading(true);
    if(email && password){
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;
        const userDoc = await getDoc(doc(db,"users",user.uid));
        const userData = userDoc.data();
        console.log(userData);

        dispatch(setUser({
          name: userData.name,
          email: user.email,
          uid: user.uid,
        }));

        setLoading(false);
        toast.success("Successfully Login")

        navigate("/profile");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    }else{
      setLoading(false);
      toast.error("Make sure email and password are not empty");
    }
  }

  return (
    <>
        <InputComponent type="email" state={email} setState={setEmail} placeholder="Email" required={true}/>
        <InputComponent type="password" state={password} setState={setPassword} placeholder="Password" required={true}/>
        <Button text={loading?"Loding...":"Login"} disabled={loading} onClick={handleLogin}/>
    </>
  )
}

export default LoginForm;
