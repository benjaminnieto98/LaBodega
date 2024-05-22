import React, { useContext, useState } from 'react'
import './styles.css'
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../../main'
import { useNavigate } from "react-router-dom"
import { AuthContext } from '../../context/auth-context';

const Login = () => {
    const [error, setError] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const { dispatch } = useContext(AuthContext)

    const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                dispatch({ type: "LOGIN", payload: user })
                navigate("/")
            })
            .catch((error) => {
                setError(true);
            });
    }

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                dispatch({ type: "LOGOUT" });
                navigate("/");
            })
            .catch((error) => {
                console.error("Error al cerrar sesión:", error);
            });
    }

    return (
        <div className="loginContainer">
            <div className='login'>
                <form onSubmit={handleLogin}>
                    <input type="email" placeholder='Email' onChange={e => setEmail(e.target.value)} />
                    <input type="password" placeholder='Contraseña' onChange={e => setPassword(e.target.value)} />
                    <button type='submit'>Ingresar</button>
                    {error && <span>Email o contraseña incorrectos</span>}
                </form>
                <button onClick={handleLogout}>Cerrar Sesión</button>
            </div>
        </div>
    )
}

export default Login
