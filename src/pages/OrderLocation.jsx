import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import { LOGIN } from '../redux/actions/actions.js/authAction'
import axios from 'axios'
import { API_PATH } from '../tools/constats'

const OrderLocation = () => {
    const nav = useNavigate();

    const [contact, setContact] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    const proceedToPayment = (e) => {
        e.preventDefault()

        if (contact == '' || phone == '' || country == '' || region == '' || city == '' || zipCode == '') {
            alert('заполните все поля')
            return;
        }

        const products = localStorage.getItem('cartItems');
        const userToken = localStorage.getItem('userToken');

        const config = {
            headers: {
                Authorization: `token ${userToken}`
            },
        };

        const locationData = JSON.stringify({
            contact_name: contact,
            phone: phone,
            country: country,
            region: region,
            city_or_town: city,
            zipCode: zipCode
        });

        axios.post(API_PATH + 'user/checkout/', {}, config)
            .then((response) => {
                axios.post(API_PATH + 'order/stripe/', JSON.parse(products))
                    .then((response) => {
                        console.log(response.data);
                        localStorage.setItem('location', locationData)

                        return response.data.url
                    })
                    .then((url) => {
                        window.location.replace(url)
                    })
            })
            .catch((error) => {
                nav('/login');
            });


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
                                        Укажите адрес
                                    </div>
                                    <div className="registr_h">
                                        Контакты  <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setContact(e.target.value)} value={contact} required placeholder='' type="text" name="" id="" className="registr_inp" />

                                    <div className="registr_h">
                                        Телефон Номер <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input value={phone} onChange={e => setPhone(e.target.value)} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Страна <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setCountry(e.target.value)} value={country} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Регион <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setRegion(e.target.value)} value={region} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Город или район <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setCity(e.target.value)} value={city} required placeholder='' type="text" name="" id="" className="registr_inp" />
                                    <div className="registr_h">
                                        Zipcode <span style={{ color: "red" }}>*</span>
                                    </div>
                                    <input onChange={e => setZipCode(e.target.value)} value={zipCode} required placeholder='' type="text" name="" id="" className="registr_inp" />

                                    <button type='submit' onClick={proceedToPayment} className="register_in">Потвердить</button>
                                    <Link to='/basket' className="register_reg">Отменить</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderLocation;