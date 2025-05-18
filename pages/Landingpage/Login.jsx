import { useState } from 'react';
import '../../src/Css/Landingpage-inputCredentials.css';
import { useNavigate } from 'react-router-dom';

function Login({ closeLogin, showlogin, showsignup }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        try {
            const response = await fetch('http://localhost/CCIS_CONNECT-MASTER/src/php/login.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                // Store the username (studentID) in localStorage
                localStorage.setItem('username', result.username);

                alert("Login Successful!");
                navigate("/Mainpage"); // Redirect to the main page
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError("Something went wrong: " + error.message);
        }
    };

    return (
        <>
            <dialog className="Login-content-container credential-content-container" id='login'>
                <div className="Login-container credential-container">
                    <div className="Login-header">
                        <h1>LOG<span className='design-1'>IN</span></h1>
                        <button onClick={() => closeLogin(false)}>X</button>
                    </div>
                    <div className="Login-body">
                        <form onSubmit={handleSubmit}>
                            <section className="username-section Login-section">
                                <label htmlFor="username-input">Email</label>
                                <input
                                    type="text"
                                    name="username-input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </section>

                            <section className="password-section Login-section">
                                <label htmlFor="password-input">Password</label>
                                <input
                                    type="password"
                                    name="password-input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </section>

                            <section className="createaccount-section">
                                <p>Don't have an account? </p>
                                <a onClick={() => { showlogin(false); showsignup(true) }}>Sign up here.</a>
                            </section>

                            {error && (
                                <section className="invalid-credentials">
                                    <p>{error}</p>
                                </section>
                            )}

                            <section className="submit-section Login-section">
                                <button type="submit">Login</button>
                            </section>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default Login;