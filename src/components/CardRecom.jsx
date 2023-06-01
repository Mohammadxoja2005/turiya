import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { API_PATH } from '../tools/constats'


const CardRecom = () => {
    const [category, setCategory] = useState(JSON.parse(localStorage.getItem('CATEGORY_ID')) || '')
    const [like, setLike] = useState()

    const [data, setData] = useState('')

    const getProduct = () => {
        axios.get(API_PATH + `product/?cat=${category}`)
            .then((res => {
                setData(res.data)
            }))
    }

    useEffect(() => {
        getProduct();
    }, [])
    return (
        <>
            <div className="CardRecom">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="c_recom_name">
                                Похожие продукты
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-3 col-6 mb-sm-4 mb-3 main_col">
                            <div className="main_main">
                                <div className="main_box_img">
                                    <img src="/img/main_prod.png" alt="" className="main_img" />
                                </div>
                                <div className="main_text">
                                    <div className="main_h">Винтажная пишущая машинка для публикации потрясающих историй о дизайне пользовательского интерфейса и веб-разработке.
                                    </div>
                                    <div className="main_sale">
                                        999 000 сум
                                    </div>
                                    <div className="main_p">
                                        Доступно для отправки на Марс или куда-либо еще
                                    </div>

                                    <div className="main_price">
                                        <div className="main_left">
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_2.png" alt="" className="main_star" />
                                            <div className="main_star_h">4.99</div>
                                        </div>
                                        <div className="main_right">
                                            <div onClick={() => setLike(!like)} className={`main_like_box ${like ? 'active' : ''}`}>
                                                <img src="/img/like.png" alt="" className="main_like" />
                                                <div className="main_like_h">Сохранить</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 mb-sm-4 mb-3 main_col">
                            <div className="main_main">
                                <div className="main_box_img">
                                    <img src="/img/main_prod.png" alt="" className="main_img" />
                                </div>
                                <div className="main_text">
                                    <div className="main_h">Винтажная пишущая машинка для публикации потрясающих историй о дизайне пользовательского интерфейса и веб-разработке.
                                    </div>
                                    <div className="main_sale">
                                        999 000 сум
                                    </div>
                                    <div className="main_p">
                                        Доступно для отправки на Марс или куда-либо еще
                                    </div>

                                    <div className="main_price">
                                        <div className="main_left">
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_2.png" alt="" className="main_star" />
                                            <div className="main_star_h">4.99</div>
                                        </div>
                                        <div className="main_right">
                                            <div onClick={() => setLike(!like)} className={`main_like_box ${like ? 'active' : ''}`}>
                                                <img src="/img/like.png" alt="" className="main_like" />
                                                <div className="main_like_h">Сохранить</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 mb-sm-4 mb-3 main_col">
                            <div className="main_main">
                                <div className="main_box_img">
                                    <img src="/img/main_prod.png" alt="" className="main_img" />
                                </div>
                                <div className="main_text">
                                    <div className="main_h">Винтажная пишущая машинка для публикации потрясающих историй о дизайне пользовательского интерфейса и веб-разработке.
                                    </div>
                                    <div className="main_sale">
                                        999 000 сум
                                    </div>
                                    <div className="main_p">
                                        Доступно для отправки на Марс или куда-либо еще
                                    </div>

                                    <div className="main_price">
                                        <div className="main_left">
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_2.png" alt="" className="main_star" />
                                            <div className="main_star_h">4.99</div>
                                        </div>
                                        <div className="main_right">
                                            <div onClick={() => setLike(!like)} className={`main_like_box ${like ? 'active' : ''}`}>
                                                <img src="/img/like.png" alt="" className="main_like" />
                                                <div className="main_like_h">Сохранить</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-6 mb-sm-4 mb-3 main_col">
                            <div className="main_main">
                                <div className="main_box_img">
                                    <img src="/img/main_prod.png" alt="" className="main_img" />
                                </div>
                                <div className="main_text">
                                    <div className="main_h">Винтажная пишущая машинка для публикации потрясающих историй о дизайне пользовательского интерфейса и веб-разработке.
                                    </div>
                                    <div className="main_sale">
                                        999 000 сум
                                    </div>
                                    <div className="main_p">
                                        Доступно для отправки на Марс или куда-либо еще
                                    </div>

                                    <div className="main_price">
                                        <div className="main_left">
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_1.png" alt="" className="main_star" />
                                            <img src="/img/star_2.png" alt="" className="main_star" />
                                            <div className="main_star_h">4.99</div>
                                        </div>
                                        <div className="main_right">
                                            <div onClick={() => setLike(!like)} className={`main_like_box ${like ? 'active' : ''}`}>
                                                <img src="/img/like.png" alt="" className="main_like" />
                                                <div className="main_like_h">Сохранить</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CardRecom