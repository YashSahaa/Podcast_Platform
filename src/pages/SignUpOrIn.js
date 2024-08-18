import React, { useState } from 'react';
import Header from '../components/common/Header';
import SignUpForm from '../components/SignupComponent/SignUpForm';
import LoginForm from '../components/SignupComponent/LoginFrom';

const SignUpOrIn = () => {
    
  const [flag,setFlag] = useState(false);

  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
          {!flag ? (
            <>
              <h1>SignUp</h1>
              <SignUpForm/>
              <p>Already have an account? <span style={{cursor:"pointer",color:"var(--blue)"}} onClick={()=>setFlag(!flag)}>Click Here</span> to Login</p>
            </>
          ):(<>
              <h1>Login</h1>
              <LoginForm/>
              <p>Don't have an account? <span style={{cursor:"pointer",color:"var(--blue)"}} onClick={()=>setFlag(!flag)}>Click Here</span> to SignUp</p>
          </>)}   
        </div>
    </div>
  )
}

export default SignUpOrIn;
