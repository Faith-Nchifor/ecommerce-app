// this is the login page
import { useContext, useState } from 'react';
import styles from '@/styles/Home.module.css'
import MakeRequest from '@/utils/makeRequest';
import { AuthContext } from '@/context/authContext';
import { useRouter } from 'next/router';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const { login, user } = useContext(AuthContext)
    const router = useRouter();

    const handleSubmit = (event) => {
        event.preventDefault();
        MakeRequest({
            method: 'post',
            url: process.env.NEXT_PUBLIC_LOGIN,
            body: {
                username: username,
                password: password
            }
        }).then((userData) => {
            console.log(userData);
            if (userData) {

                login(userData);
            }
            else alert('request was not successfull. Please try again')
        }).catch(e => {
            console.log(e);
        })
    };
    //navigate to home if user is authenticated
    if (user) return router.push('/')

    return (
        <main className={styles.main}>
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='col-md-8 col-lg-6 col-sm-10 col-10'>
                    <div className="row">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="row">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type="submit" className='btn btn-dark mt-3 center' typeof='button'>Log in</button>
            </form>


        </main>
    );
};

export default Login;
