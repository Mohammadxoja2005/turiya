import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { LOGIN, REGISTER, REGISTERVERIFY } from '../redux/actions/actions.js/authAction'
import { API_PATH } from '../tools/constats'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {

    const notify = () => toast("Wow so easy!");


    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [code, setCode] = useState('')
    const nav = useNavigate();

    // const navigate = useNavigate()
    //     const Register = () => {
    //         axios.post(API_PATH + 'user/register/', { phone, password })
    //             .then((res) => {
    //                 localStorage.setItem("PHONE",JSON.stringify(phone))
    //                 localStorage.setItem("PASSWORD",JSON.stringify(password))
    //                 navigate('/verify')
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             })
    //     }


    const dispatch = useDispatch()

    const registration = (e) => {
        e.preventDefault()
        localStorage.setItem("PHONE", JSON.stringify(phone))
        localStorage.setItem("PASSWORD", JSON.stringify(password))
        dispatch(REGISTER(phone, password, nav))
    }

    return (
        <>
            <div className="Registration">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <form onSubmit={registration} action="">
                                <div className="registr_box">
                                    <div className="registr_name">
                                        Регистрация
                                    </div>
                                    <div className="registr_h">
                                        Ваш номер телефона *
                                    </div>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder='+998' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Установите пароль *
                                    </div>
                                    <input value={password} onChange={e => setPassword(e.target.value)} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Подтвердите пароль  *
                                    </div>
                                    <input value={password2} onChange={e => setPassword2(e.target.value)} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <button type='submit' className="register_reg">Регистрация</button>
                                    <Link to='/login' className="register_in">Войти</Link>
                                    <ToastContainer />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Registration