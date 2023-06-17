import axios from 'axios'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { API_PATH } from '../tools/constats'
import { Rating } from 'react-simple-star-rating'
import { addToWishlist, WishlistDispatchContext } from '../contexts/wishlist'
import { addToCart, CartDispatchContext } from '../contexts/cart';
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { getText } from '../locales'



function Interesting() {
    // const dispatch = useContext(WishlistDispatchContext)
    const dispatch = useContext(CartDispatchContext);
    const [like, setLike] = useState()


    const [inter, setInter] = useState('')
    const navigate = useNavigate()


    const getInter = () => {
        axios.get(API_PATH + 'product/popular/')
            .then((res => {
                setInter(res.data)
            }))
    }

    useEffect(() => {
        getInter()
    }, [])

    const [rating, setRating] = useState(0)

    // Catch Rating value
    const handleRating = (rate) => {
        setRating(rate)
    }

    const saveBtns = useRef([]);
    const currect = useRef([])

    const handleAddToWishlist = (item, index) => {

        saveBtns.current[index].style.background = "#02897A";
        saveBtns.current[index].style.color = "#FFFFFF";
        currect.current[index].src = "/img/right.png ";


        const product = { ...item, quantity: 1 }
        addToWishlist(dispatch, product)
        setTimeout(() => {
        }, 3500)

    }
    const detail = (id) => {
        localStorage.setItem("PRODUCT_ID", JSON.stringify(id))
        navigate('/card')
    }

    const handleAddBasket = (data, quantity = 1) => {
        const product = { ...data, quantity };
        console.log(data, quantity)

        addToCart(dispatch, product);

        setTimeout(() => {
        }, 3500);
    }


    return (
        <>
            <div className="Interesting">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="inter_name">
                                {getText("inter_name")}
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="head_main_box">
                                <div className="row">

                                    {inter && inter.map((item, index) => {
                                        return (
                                            <div key={index} className="col-lg-3 col-6 mb-sm-4 mb-3 main_col">
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
                                                            {item.price} sum
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default Interesting