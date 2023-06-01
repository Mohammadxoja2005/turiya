import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation, Pagination } from "swiper";
import { API_PATH } from "../tools/constats";
import { useEffect } from "react";
import axios from "axios";
import { Rating } from 'react-simple-star-rating'
import { addToWishlist, WishlistDispatchContext } from '../contexts/wishlist'
import { getText } from '../locales'


import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

const Deal = () => {
    const [like, setLike] = useState()
    const [deal, setDeal] = useState()
    const [sale, setSale] = useState()
    const navigate = useNavigate()
    const saveBtns = useRef([]);
    const currect = useRef([])
    const dispatch = useContext(WishlistDispatchContext);
    const [change, setChange] = useState(false);




    const getSale = () => {
        axios.get(API_PATH + 'product/?sale=1')
            .then((res => {
                setSale(res.data)
            }))
    }

    const getDeal = () => {
        axios.get(API_PATH + 'order/campaign/')
            .then((res => {
                setDeal(res.data)
            }))

    }

    const getNavigate = () => {
        navigate("/shop")
    }

    useEffect(() => {
        getDeal()
        getSale()
    }, [])

    const [rating, setRating] = useState(0);
    const handleRating = (rate) => {
        setRating(rate)
    }

    const handleAddToWishlist = (item, index) => {

        saveBtns.current[index].style.background = "#02897A";
        saveBtns.current[index].style.color = "#FFFFFF ";
        currect.current[index].src = "/img/right.png ";
        // document.getElementById(index).setAttribute('style', 'background:#000') 

        const product = { ...item, quantity: 1 };
        addToWishlist(dispatch, product);


        setTimeout(() => {
        }, 3500);
        setChange(true)

    };

    const detail = (id) => {
        localStorage.setItem("PRODUCT_ID", JSON.stringify(id))
        navigate('/card')
    }

    return (
        <>
            <div className="Deal">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="deal_name">{getText("deal_name")}</div>
                        </div>

                        {deal && deal.map((item, index) => {
                            return (
                                <div key={index} className="col-lg-4 col-sm-6 mb-4">
                                    <div onClick={() => getNavigate()} className="deal_box">
                                        <img src={item.get_image} alt="" className="deal_img" />
                                        <div className="deal_text">
                                            <div className="deal_h">{item.name}</div>
                                            <div className="deal_p">{item.title}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}



                    </div>
                    <div className="row deal_row">
                        <div className="col-4 mb-4 d-lg-flex d-none">
                            <div className="deal_box_2">
                                <img src="/img/deal_2.png" alt="" className="deal_img_2" />
                                <div className="deal_text_2">
                                    <div className="deal_h_2">Майская распродажа</div>
                                    <div className="deal_p_2">Ищите новый сезон</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className="row">
                                <div className="col-12"><div className="deal_name_2">Cо скидкой</div></div>
                                {sale && sale.map((item, index) => {
                                    return (
                                        <div key={index} className="col-lg-4 mb-sm-4 mb-3 col-6 deal_main">
                                            <div className="main_main">
                                                <div>
                                                    <div onClick={() => detail(item.id)} className="main_box_img">
                                                        <img src={item.get_image} alt="" className="main_img" />
                                                    </div>
                                                    <div className="main_h">{item.name.slice(0, 80)}...
                                                    </div>
                                                </div>

                                                <div className="main_text">
                                                    <div className="main_p">
                                                        {item.description.slice(0, 100)}...
                                                    </div>
                                                    <div className="main_sale_2">
                                                        {item.price} {getText("sum")}
                                                    </div>
                                                    <div className="main_sale">
                                                        {item.new_price} {getText("sum")}
                                                    </div>


                                                    <div className="main_price">
                                                        <div className="main_left">
                                                            <Rating className='main_left_star'
                                                                initialValue={item.get_rating} />
                                                            <div className="main_star_h">
                                                                {item.get_rating}
                                                            </div>
                                                        </div>

                                                        <div className="main_right">
                                                            <div data-index={item.id} ref={(element) => saveBtns.current.push(element)} onClick={() => handleAddToWishlist(item, index)} className='main_like_box'>
                                                                <img data-index={item.id} ref={(element) => currect.current.push(element)} onClick={() => handleAddToWishlist(item, index)} src="/img/like.png" alt="" className="main_like" />
                                                                <div className='main_like_h'>{getText('nav_2')}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}



                            </div>
                        </div>
                    </div>
                    <div className="row deal_row">
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={30}
                            breakpoints={{
                                576: {
                                    slidesPerView: 1,
                                },
                                767: {
                                    slidesPerView: 2,
                                },
                                1024: {
                                    slidesPerView: 3,
                                },
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                            }}
                            pagination={{
                                clickable: true,
                            }}
                            loop={true}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >

                            {deal && deal.map((item, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div onClick={() => getNavigate()} className="deal_box">
                                            <img src={item.get_image} alt="" className="deal_img" />
                                            <div className="deal_text">
                                                <div className="deal_h">{item.name}</div>
                                                <div className="deal_p">{item.title}</div>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            })}

                        </Swiper>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Deal