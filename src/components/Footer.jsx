import React from 'react'
import { Link } from 'react-router-dom'
import { getText } from '../locales'

const Footer = () => {
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
                            <Link to="" className="foot_a">Женская одежда</Link>
                            <Link to="" className="foot_a">Женские сумки</Link>
                            <Link to="" className="foot_a">Женские аксессуары</Link>
                            <Link to="" className="foot_a">Женская обувь</Link>
                            <Link to="" className="foot_a">Косметика</Link>
                            <Link to="" className="foot_a">Мужчинам</Link>
                            <Link to="" className="foot_a">Дом</Link>
                            <Link to="" className="foot_a">Игрушки</Link>
                            <Link to="" className="foot_a">Подарки & Новый год</Link>
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