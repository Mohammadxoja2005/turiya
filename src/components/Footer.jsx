import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getText } from '../locales'
import { API_PATH } from '../tools/constats'
import axios from 'axios'

const Footer = () => {

    const [subCategory, setSubCatgory] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(API_PATH + `product/category/1/`)
            .then((res => {
                setSubCatgory(res.data.subcategories);
            }))
    }, [])

    return (
        <>
            <div className="Footer">
                <div className="container">
                    <div className="row">
                        <div className="col-12 foot_soc ">
                            <div className="foot_soc_box ">
                                <a href="" className="foot_soc">
                                    <img src="/img/telegram.png" alt="" className="nav_soc_img" />
                                </a>
                                <a href="" className="foot_soc">
                                    <img src="/img/instagram.png" alt="" className="nav_soc_img" />
                                </a>
                                <a href="" className="foot_soc">
                                    <img src="/img/facebook.png" alt="" className="nav_soc_img" />
                                </a>
                                <a href="" className="foot_soc">
                                    <img src="/img/youtube.png" alt="" className="nav_soc_img" />
                                </a>
                            </div>
                        </div>
                        <div className="col-12 d-flex flex-lg-row flex-column justify-content-between align-items-lg-start align-items-center ">
                            {subCategory && subCategory.slice(0, 8).map((category) => {
                                return (
                                    <>
                                        <Link onClick={() => {
                                            window.location.reload()
                                            navigate(`/shop/${category.id}`)
                                        }} to={`/shop/${category.id}`} className="foot_a">{category.name}</Link>
                                    </>

                                )
                            })}
                        </div>
                        <div className="col-12 foot_soc d-lg-flex d-none">
                            <div className="foot_soc_box foot_soc_box_2">
                                <a href="" className="foot_soc">
                                    <img src="/img/telegram.png" alt="" className="nav_soc_img" />
                                </a>
                                <a href="" className="foot_soc">
                                    <img src="/img/instagram.png" alt="" className="nav_soc_img" />
                                </a>
                                <a href="" className="foot_soc">
                                    <img src="/img/facebook.png" alt="" className="nav_soc_img" />
                                </a>
                                <a href="" className="foot_soc">
                                    <img src="/img/youtube.png" alt="" className="nav_soc_img" />
                                </a>
                            </div>
                        </div>
                        <div className="col-12 d-flex justify-content-center">
                            <img src="/img/logo_foot.png" alt="" className="foot_logo" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="Foot_2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex align-content-center justify-content-center">
                            <div className="foot_h">@ Copyright 2023</div>
                            <a href='' className='foot_z'><img src="/img/zamaan.png" alt="" className="foot_zamaan" /></a>
                            <div className="foot_h"> All rights reserved.</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer