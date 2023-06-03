import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { LOGIN } from '../redux/actions/actions.js/authAction'

const Login = () => {

    const [loginPhone, setLoginPhone] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const dispatch = useDispatch()
    const nav = useNavigate()

    const login = (e) => {
        e.preventDefault()
        dispatch(LOGIN(loginPhone, loginPassword, nav))
    }

    return (
        <>
            <div className="Login">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <form action="">
                                <div className="registr_box">
                                    <div className="registr_name">
                                        Войти в систему
                                    </div>
                                    <div className="registr_h">
                                        Ваш Email  <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setLoginPhone(e.target.value)} value={loginPhone} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Пароль <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setLoginPassword(e.target.value)} value={loginPassword} required placeholder='' type="text" name="" id="" className="registr_inp" />

                                    <Link to='/registration' className="register_reg">Регистрация</Link>
                                    <button type='submit' onClick={(e) => login(e)} className="register_in">Войти</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login