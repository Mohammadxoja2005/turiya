import React, { useContext, useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { addToCart, CartDispatchContext, CartStateContext, minusToCart, removeFromCart } from '../contexts/cart';
import { API_PATH } from "../tools/constats";
import axios from "axios";
import { getText } from '../locales';

const Basket = () => {

    const nav = useNavigate()
    const { items, isCartOpen } = useContext(CartStateContext);
    const dispatch = useContext(CartDispatchContext);
    const products = JSON.parse(localStorage.getItem('cartItems'))
    // const [productPaymentInfo, setProductPayInfo] = useState();

    const productPaymentInfo = JSON.parse(localStorage.getItem("paymentInfo"))
    // const productPayment = JSON.parse(localStorage.getItem("paymentInfo"))


    const handleRemove = (productId) => {
        removeFromCart(dispatch, productId)
    };

    const increaseProduct = (dispatch, product) => {
        addToCart(dispatch, product)
    }

    const decreaseProduct = (dispatch, product) => {
        minusToCart(dispatch, product)
    }

    const paymentBasket = () => {
        if (products) {

            const payMentDetail = {
                allPrice: 0,
                allQuantity: 0,
                deliverPrice: 5000,
            };

            let allProductsPrice = 0;
            let allProductQuantity = 0;

            products.map((product) => {
                allProductsPrice += product.quantity * product.price;
                allProductQuantity += product.quantity;
            })

            payMentDetail.allPrice = allProductsPrice;
            payMentDetail.allQuantity = allProductQuantity;

            // const paymentDetailString = JSON.stringify(payMentDetail)

            // localStorage.setItem('paymentInfo', paymentDetailString);
            // setProductPayInfo(productPayment)
        }
    }

    useEffect(() => {
        paymentBasket()
    }, [])

    let total_amount = 0

    function calc() {
        items.map((item) => {
            total_amount += item.quantity * item.new_price
        })
    }

    calc();

    const redirect = () => {

        const userId = localStorage.getItem('turiya');

        axios.post(`${API_PATH}user/checkout/`, {}, {
            headers: {
                Authorization: `Token ${userId}`,
            }
        }).then((res) => {

            switch (res.status) {
                case 200: nav('/checkout'); break;
                case 404: nav('/login'); break;
                default: alert("something went wrong");
            }

        })
        nav('/checkout')
    }

    // const location = useLocation()
    const formData = new FormData()

    formData.append('products', items)

    const order = () => {

        const userToken = localStorage.getItem('userToken');

        const config = {
            headers: {
                Authorization: `token ${userToken}`
            },
        };

        axios.post(API_PATH + 'user/checkout/', {}, config)
            .then((response) => {
                nav('/location')
            })
            .catch((error) => {
                nav('/login');
            });
    }

    const increaseProductCount = (productId) => {
        // console.log(products);
        // products.forEach((productItem) => {
        //     if (productItem.id == productId) {
        //         productItem.quantity += 1;
        //     }
        // })
        // console.log('changed', products);
    }

    console.log(products);

    return (
        <>
            <Header />
            <div className="Basket">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="bas_h">
                                {getText("header_2")} / <span>{getText("nav_2")}</span>
                            </div>
                            <div className="bas_name">{getText("nav_2")}</div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            {items.map((product) => {
                                return (
                                    <div key={product.id} className="bas_box">
                                        <div className="bas_left">
                                            <div onClick={() => {
                                                handleRemove(product.id)
                                            }
                                            } className="bas_bas">
                                                <img src="/img/basket.png" alt="" className="bas_bas_img" />
                                            </div>
                                            <div className="bas_prod">
                                                <img src={product.images[0].get_image} alt="" className="bas_prod_img" />
                                            </div>
                                            <div className="bas_descr">
                                                {product.name}
                                            </div>
                                            <div className="bas_sale">
                                                {product.new_price != null ? product.quantity * product.new_price : product.quantity * product.price} {getText("sum")}
                                            </div>
                                        </div>
                                        <div className="bas_line"></div>

                                        <div className="bas_cal">
                                            <div onClick={() => {
                                                increaseProduct(dispatch, product)
                                            }} className="cal_plus">+</div>
                                            <div className="cal_num">{product.quantity}</div>
                                            <div onClick={() => {
                                                decreaseProduct(dispatch, product)
                                            }} className="cal_minus">-</div>
                                        </div>
                                    </div>
                                )
                            })}

                        </div>
                        <div className="col-3 d-lg-block d-none">
                            <div className="bas_box_2">

                                {productPaymentInfo && products.length != 0 ?
                                    <div className="bas_2_top">
                                        <div className="bas_2_text">
                                            <div className="bas_2_h">{getText("bas_2_h_1")} {productPaymentInfo.allQuantity} {getText("count")}</div>
                                            <div className="bas_2_p">{productPaymentInfo.allPrice} {getText("sum")}</div>
                                        </div>
                                        <div className="bas_2_text">
                                            <div className="bas_2_h">{getText("bas_2_h_2")}</div>
                                            <div className="bas_2_p">{productPaymentInfo.deliverPrice} {getText("sum")}</div>
                                        </div>
                                        {/* <div className="bas_2_text">
                                            <div className="bas_2_h">Скидка</div>
                                            <div className="bas_2_p">{product.new_price ? `${product.price - product.new_price}` : '0'} сум</div>
                                        </div> */}
                                        {/* <div className="bas_2_text">
                                            <div className="bas_2_h">Налог</div>
                                            <div className="bas_2_p">300 000 сум</div>
                                        </div> */}
                                        <div className="bas_2_sale">
                                            <div className="bas_2_h_2">{getText("bas_2_h_3")}</div>
                                            <div className="bas_2_p_2">{`${productPaymentInfo.allPrice + productPaymentInfo.deliverPrice}`} {getText("sum")}</div>
                                        </div>
                                    </div>
                                    : null}

                                {products.length != 0 ?
                                    <button onClick={order} className="bas_2_a">{getText("bas_2_h_4")}</button>
                                    : <div>{getText("baset_empty")}</div>
                                }

                            </div>
                        </div>

                        {items.map((product) => {
                            return (
                                <div className="col-12">
                                    <div className="bas_box_3">
                                        <div className="bas_box_3_top">
                                            <img src={product.images[0].get_image} alt="" />
                                        </div>
                                        <div className="bas_descr_2">
                                            {product.name}
                                        </div>
                                        <div className="bas_cal_2">
                                            <div onClick={() => addToCart(dispatch, product)} className="cal_plus_2">+</div>
                                            <div className="cal_num_2">{product.quantity}</div>
                                            <div onClick={() => minusToCart(dispatch, product)} className="cal_minus_2">-</div>
                                        </div>
                                        <div className="bas_box_3_text">
                                            <div className="bas_3_h"><span>{getText("bas_2_h_1")}</span> ({product.quantity}) {getText("count")}</div>
                                            <div className="bas_3_p">{total_amount}</div>
                                        </div>
                                        <div className="bas_box_3_text_2">
                                            {/* <div className="bas_3_h_2">Общая сумма</div> */}
                                            <div className="bas_3_p_2">{product.quantity * product.price} {getText("sum")}</div>
                                        </div>
                                        <div onClick={() => handleRemove(product.id)} className="bas_box_3_false">
                                            <img src="/img/false_2.png" alt="" />
                                            {getText("clear")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                        <div className="col-12 d-lg-none d-block">

                            {productPaymentInfo && products.length != 0 ?

                                <div className="bas_box_2">
                                    <div className="bas_2_top">
                                        <div className="bas_2_text">
                                            <div className="bas_2_h">{getText("bas_2_h_1")} {productPaymentInfo.allQuantity} {getText("count")}</div>
                                            <div className="bas_2_p">{productPaymentInfo.allPrice}</div>
                                        </div>
                                        <div className="bas_2_text">
                                            <div className="bas_2_h">{getText("bas_2_h_2")}</div>
                                            <div className="bas_2_p">{productPaymentInfo.deliverPrice} {getText("sum")}</div>
                                        </div>

                                        <div className="bas_2_sale">
                                            <div className="bas_2_h_2">{getText("bas_2_h_3")}</div>
                                            <div className="bas_2_p_2">{`${productPaymentInfo.allPrice + productPaymentInfo.deliverPrice}`} {getText("sum")}</div>
                                        </div>
                                    </div>
                                    <div onClick={order} className="bas_2_a">{getText("bas_2_h_4")}</div>
                                </div>

                                : null}
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Basket