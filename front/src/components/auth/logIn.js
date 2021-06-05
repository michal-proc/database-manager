import { React, useState, useContext } from 'react';
import axios from 'axios'
import { UserContext } from './userContext'
import { Redirect } from 'react-router-dom'
import '../../styles/loginStyle.css'

const LoginComponent = () => {
    const { user, Setuser } = useContext(UserContext)

    const [password, setPassword] = useState('');
    const [login, setLogin] = useState('');
    const [response, setResponse] = useState(null)

    const loginFunction = () => {
        if (login !== '' && password !== '') {
            axios({
                method: "post",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    'Access-Control-Allow-Credentials': true
                },
                data: {
                    username: login,
                    password: password,
                },
                url: "http://localhost:5000/login",
            })
                .then((res) => {
                    setResponse(res.data.message)
                    if (res.data.success) {
                        new Promise(() => {
                            Setuser({
                                ...res.data.user,
                                logged: true
                            })
                        }).then(() => {
                            return <Redirect to='/home' />
                        })
                    }
                })
        } else {
            setResponse("enter valid data")
        }

    }
    document.title = `Login`;
    return (
        < div className="container  d-flex align-items-center w-100 h-100 justify-content-center" >
            <div className="row w-100 d-flex justify-content-center">
                <div className="col-md-8 customColumn">
                    <div className="card bg-ligt customCard">
                        <div className="box d-flex flex-column align-items-center  customLogin">
                            <h3 className="m-5">Login</h3>
                            <input type="text" className="form-control  m-2 " placeholder="Login" onChange={(e) => setLogin(e.target.value)} />
                            <input type="password" className="form-control  m-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <span >{response}</span>
                            <button className="btn btn-info w-50 m-4"
                                onClick={loginFunction}
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default LoginComponent 
