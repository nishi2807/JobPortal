import React, { useState } from "react";
import './forgotpassword.css'

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // Make a request to your server to reset the user's password using the user's email address
    // Display a success message or an error message
  };

  return (
    <div className="forgotpassword-main-container">
        <div className= "forgotpassword-blur-container">
      <h1 className="main-title">Forgot Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="forgotpassword-subheading">
        <label >Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
        <button type="submit" className='submit-btn'>Submit</button>
      </form>
      </div>
    </div>
  );
}

export default ForgotPassword;