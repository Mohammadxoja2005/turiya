import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { LOGIN, REGISTER, REGISTERVERIFY } from '../redux/actions/actions.js/authAction'
import { API_PATH } from '../tools/constats'
import { getText } from '../locales'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Registration = () => {
    const dispatch = useDispatch()
    const nav = useNavigate()

    const notify = () => toast(getText('orderLocationNotify'));
    const notifyError = () => toast(getText('passwordErr'))

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [code, setCode] = useState('')
    const [verifyStatus, setVerifyStatus] = useState(false);

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

    const registration = (e) => {
        e.preventDefault()

        if (password != password2) {
            notifyError()
            return;
        }

        localStorage.setItem("PHONE", JSON.stringify(phone))
        localStorage.setItem("PASSWORD", JSON.stringify(password))

        axios.post(`${API_PATH}user/register/`, {
            email: phone,
            password: password,
            password2: password2

        }).then((response) => {
            setVerifyStatus(true);
        })

    }

    const verifyEmail = (e) => {
        e.preventDefault();

        axios.post(`${API_PATH}user/verify-register/`, { email: phone, code: code })
            .then((verifyResponse) => {
                notify()
                nav('/login')
            })
    }

    return (
        <>
            <ToastContainer />
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
                                        Ваш Email  <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder='' type="email" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Установите пароль <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input value={password} onChange={e => setPassword(e.target.value)} required placeholder='' type="text" name="" id="" className="registr_inp" />

                                    <div className="registr_h">
                                        Подтвердите пароль  <span style={{ color: "red" }}>*</span>
                                    </div>

                                    <input value={password2} onChange={e => setPassword2(e.target.value)} required placeholder='' type="text" name="" id="" className="registr_inp" />

                                    {verifyStatus ?
                                        <>
                                            <div className="registr_h">
                                                Введите код отправленный на ваш email  <span style={{ color: "red" }}>*</span>
                                            </div>

                                            <input value={code} onChange={e => setCode(e.target.value)} placeholder='' type="text" name="" id="" className="registr_inp" />
                                        </>
                                        : null}

                                    {verifyStatus
                                        ?
                                        <button type='submit' onClick={verifyEmail} className="register_reg">Отправить код</button>
                                        :
                                        <button type='submit' onClick={registration} className="register_reg">Регистрация</button>
                                    }

                                    <Link to='/login' className="register_in">Войти</Link>
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