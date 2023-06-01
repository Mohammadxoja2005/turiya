import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { API_PATH } from '../tools/constats'
import { getText } from '../locales'

const CardHead = () => {
    const [id, setId] = useState(JSON.parse(localStorage.getItem('PRODUCT_ID') || 1))
    const [name, setName] = useState('')

    const getProduct = () => {
        axios.get(API_PATH + `product/${id}/`)
            .then((res => {
                setName(res.data.name)
            }))
    }

    useEffect(() => {
        getProduct();
    }, [])

    return (
        <>
            <div className="CardHead">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-items-center">
                            <Link to="/" className="c_h_left">
                                <img src="/img/c_h_left.png" alt="" className="c_h_l_img" />
                                <img src="/img/c_h_left_2.png" alt="" className="c_h_l_img_2" />
                                <div className="c_h_l_name">{getText("header_2")}</div>
                            </Link>
                            <img src="/img/c_h_right.png" alt="" className="c_h_img" />
                            <img src="/img/c_h_right_2.png" alt="" className="c_h_img_2" />
                            <div className="c_h_h">{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardHead