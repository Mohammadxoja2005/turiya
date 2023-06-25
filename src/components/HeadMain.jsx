import axios from 'axios'
import React, { useContext, useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToWishlist, WishlistDispatchContext } from '../contexts/wishlist'
import { addToCart, CartDispatchContext } from '../contexts/cart';
import { API_PATH } from '../tools/constats'
import { Rating } from 'react-simple-star-rating'
import { getText } from '../locales'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import { ToastContainer, toast } from 'react-toastify';

const HeadMain = () => {
    // const dispatch = useContext(WishlistDispatchContext); 
    const dispatch = useContext(CartDispatchContext);
    const [like, setLike] = useState()
    const [back, setBack] = useState([])
    const [prod, setProd] = useState([])
    const [change, setChange] = useState(false);
    const [rating, setRating] = useState(0);
    const saveBtns = useRef([]);
    const currect = useRef([])
    const text = useRef([])

    const notify = () => toast(getText('basketMsg'));

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }

    const getBack = () => {
        axios.get(API_PATH + 'order/slider/')
            .then((res => {
                setBack(res.data)
            }))

        axios.get(API_PATH + 'product/')
            .then((res => {
                setProd(res.data)
            }))
    }


    useEffect(() => {
        getBack()
    }, []);

    const navigate = useNavigate()

    // const saveBtns = document.querySelectorAll('.main_like_h'); 

    const detail = (id) => {
        localStorage.setItem("PRODUCT_ID", JSON.stringify(id))
        navigate('/card')
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

    const handleAddBasket = (data, quantity = 1) => {
        const product = { ...data, quantity };
        console.log(data, quantity)

        addToCart(dispatch, product)
            .then(() => {
                notify();
            })

        setTimeout(() => {
        }, 3500);
    }

    // const product = { ...data, quantity: productQuantity };

    // addToCart(dispatch, product);

    return (
        <>
        
        <ToastContainer/>
            <div className="top_2">
                <div className="top_2_box">
                    <img src="/img/search.png" alt="" className="top_2_img" />
                    <input placeholder='Поиск' type="text" name="" id="" className="top_2_inp" />
                </div>
            </div>
            <div className="HeadMain">
                <div className="headmain_container">
                    <div className="row">
                        <div className="col-12">

                            {back && back.slice(0, 1).map((item, index) => {
                                return (
                                    <div key={index} className="head_2_box" style={{ backgroundImage: `url(${item.get_image})` }}>
                                        {/* <div className="head_2_img_box"><img src="/img/head_img.png" alt="" className="head_2_img" /></div> */}
                                        <div className="head_2_text">
                                            <div className="head_2_text_2">
                                                <div className="head_2_name">{item.name}</div>
                                                <div className="head_2_h">{item.title}</div>
                                            </div>
                                            <button className='head_2_btn'><Link to="/shop" className="head_2_a">{getText('head_2_a')}</Link></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="col-12">
                            <div className="head_main_box">
                                {/* <select className='main_sel' name="" id="">
                                    <option value="">Обычное</option>
                                    <option value="">nmadir</option>
                                    <option value="">qanaqadir</option>
                                </select> */}
                                <div className="row">
                                    {prod && prod.slice(0, 6).map((item, index) => {
                                        return (
                                            <div key={item.id} className="col-lg-3 col-6 mb-sm-4 mb-3 main_col">
                                                <div className="main_main">
                                                    <div>
                                                        {item.images.slice(0, 1).map((img) => {
                                                            return (
                                                                <div onClick={() => detail(item.id)} className="main_box_img">
                                                                    <img src={img.get_image} alt="" className="main_img" />
                                                                </div>
                                                            )
                                                        })}
                                                        <div className="main_h">{item.name.slice(0, 80)}...
                                                        </div>
                                                    </div>
                                                    <div className="main_text">
                                                        <div className="main_p">
                                                            {item.description.slice(0, 100)}...
                                                        </div>

                                                        <div className="main_sale">
                                                            {item.price} {getText('sum')}
                                                        </div>

                                                        <div className="main_price">
                                                            <div className="main_left">
                                                                <Rating className='main_left_star'
                                                                    initialValue={item.get_rating} />
                                                                <div className="main_star_h">{item.get_rating}
                                                                </div>
                                                            </div>

                                                            <div className="main_right">
                                                                <div data-index={item.id} ref={(element) => saveBtns.current.push(element)} onClick={() => handleAddBasket(item, item.quantity)} className='main_like_box'>
                                                                    <img data-index={item.id} ref={(element) => currect.current.push(element)} onClick={() => handleAddBasket(item, item.quantity)} src="/img/like.png" alt="" className="main_like" />
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

                        <div className="col-12 d-flex justify-content-center">
                            <Link to="/shop" className="main_a">
                                {getText('main_a')}
                            </Link>
                        </div>

                    </div>
                </div>
            </div >
        </>
    )
}

export default HeadMain