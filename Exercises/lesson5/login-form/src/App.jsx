import { useState } from "react";
import './App.css'

function App() {
  const [showPassword, setShowPassword] = useState(true);

  function switchShowPassword() {
    if(showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  return(
    <>
      <p>Hello, welcome to my website</p>
      <div>
        <input placeholder="Email" />
      </div>
      <div>
        <input type={showPassword ? "password" : "text"} placeholder="Password"/>
        <button onClick={switchShowPassword}>{showPassword ? 'Show' : 'Hide'}</button>
      </div>
      <button className="login-sign-buttons">Login</button>
      <button className="login-sign-buttons">Sign up</button>

    </>
  );
}

export default App
