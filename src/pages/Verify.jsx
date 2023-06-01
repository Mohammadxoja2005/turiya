import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { REGISTERVERIFY } from '../redux/actions/actions.js/authAction'
import { API_PATH } from '../tools/constats'

const Verify = () => {
    const [code, setCode] = useState('')
    const [phone, setPhone] = useState(JSON.parse(localStorage.getItem('PHONE') || ''))
    const [password, setPassword] = useState(JSON.parse(localStorage.getItem('PASSWORD') || ''))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const verifyRegistration = () => {
        dispatch(REGISTERVERIFY(phone, code, password, navigate))
    }

    return (
        <>
            <div className="Registration">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <form onSubmit={verifyRegistration} action="">
                                <div className="registr_box">
                                    <div className="registr_name">
                                        Проверка
                                    </div>
                                    <input value={code} onChange={e => setCode(e.target.value)} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <button type='submit' to='/' className="register_reg">Подтвердитe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Verify