import { useState , useEffect } from 'react';
import '../../src/Css/Landingpage-inputCredentials.css';

function Signup({ email, closeSignup, loginShow, signupShow }) {
  const [emptyEmail, setEmail] = useState("");
  const [password , setPassword] = useState("");
  const [confirmPassword , setconfirmPassword] = useState("");
  const [invalidCredentials , setInvalidCredentials] = useState(false);

  useEffect(()=>{if(email){  // useEffect to set the passed email from the parent component, making it editable
      setEmail(email);
  }},[email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    if (password !== confirmPassword || !emailPattern.test(emptyEmail)) {
      setInvalidCredentials(true);
      return;
    }
  
    const studentId = document.getElementById("student_id-input").value;
    
    try {
      const response = await fetch("http://localhost/CCIS_CONNECT-MASTER/src/php/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: emptyEmail,
          student_id: studentId,
          password: password
        })
      })
      ;
  
      const result = await response.json();
      if (result.success) {
        alert("Signup successful!");
        closeSignup(false);
      } else {
        alert("Signup failed: " + result.error);
      }
    } catch (err) {
      console.error("Error signing up: " + err.message);
    }
  };
  
  return (
    <>
      {/* Signup Modal Dialog */}
      <dialog className="Signup-content-container credential-content-container">
        <div className="Signup-container credential-container">
          {/* Header Section with Title and Close Button */}
          <div className="Signup-header">
            <h1>
              SIGN <span className="design-1">UP</span>
            </h1>
            <button onClick={() => closeSignup(false)}>X</button>
          </div>
  
          {/* Body Section containing the signup form */}
          <div className="Signup-body">
            <form action="" onSubmit={handleSubmit} >
  
              {/* Email Input Field */}
              <section className="email-section Signup-section">
                <label htmlFor="email-input">Email</label>
                <input
                  type="text"
                  name="email-input"
                  id="email-input"
                  onChange={(e) => setEmail(e.target.value)}
                  value={emptyEmail}
                  pattern="^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$"
                  title="Please Enter a valid email"
                  required
                />
              </section>
  
              {/* Student ID Input with Regex Validation */}
              <section className="student_id-section Signup-section">
                <label htmlFor="student_id-input">Student ID</label>
                <input
                  type="text"
                  name="student_id-input"
                  id="student_id-input"
                  pattern="^\d{2}-\d{6}$"
                  title="Please enter a valid Student ID (e.g. 23-140041)"
                  required
                />
              </section>
  
              {/* Password Input Field */}
              <section className="password-section Signup-section">
                <label htmlFor="password-input">Password</label>
                <input
                  type="password"
                  name="password-input"
                  id ="password-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </section>
  
              {/* Confirm Password Input Field */}
              <section className="confirm_password-section Signup-section">
                <label htmlFor="confirm_password-input">Confirm Password</label>
                <input
                  type="password"
                  name="confirm_password-input"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                  required
                />
                {/* Link to login page for users with existing accounts */}
                <p>Have an account already? <a onClick={() => { loginShow(true); signupShow(false); }}>Click here to log in.</a></p>
              </section>
              {invalidCredentials && 
              (<section className="invalid-credentials">
                <p>Invalid credentials, please verify and retry</p>
              </section> )
              }
              {/* Submit Button */}
              <section className="submit-section Signup-section">
                <button type='submit'>Sign Up</button>
              </section>
             
            </form>
          </div>
        </div>
      </dialog>

    </>
  );
  
}

export default Signup;
