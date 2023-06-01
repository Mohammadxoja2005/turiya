import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import { removeFromWishlist, WishlistDispatchContext, WishlistStateContext } from '../contexts/wishlist';
import { getText } from '../locales'

const Favorite = () => {
    const { items, isWishlistOpen } = useContext(WishlistStateContext);
    const dispatch = useContext(WishlistDispatchContext);

    console.log(items);

    const handleRemove = (productId) => {
        return removeFromWishlist(dispatch, productId);
    };

    const navigate = useNavigate()

    const detail = (id) => {
        localStorage.setItem("PRODUCT_ID", JSON.stringify(id))
        navigate('/card')
    }

    return (
        <>
            <Header />
            <div className="Favorite">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="fav_text">
                                <Link to="/" className="fav_h">
                                    {getText("header_2")} /
                                </Link>
                                {getText("fav_h")}
                            </div>

                            <div className="fav_name">{getText("fav_h_2")}</div>
                        </div>
                    </div>

                    <div className="row d-md-flex d-none">
                        <div className="col-1"></div>
                        <div className="col-3"><div className="fav_cat">{getText("fav_cat_1")}</div></div>
                        <div className="col-4"><div className="fav_cat">{getText("fav_cat_2")}</div></div>
                        <div className="col-3"><div className="fav_cat">{getText("fav_cat_3")}</div></div>
                    </div>
                    {items.map((product) => {
                        return (
                            <div className="row fav_box">
                                <div onClick={() => handleRemove(product.id)} className="col-md-1 d-flex align-items-center justify-content-center">
                                    <img src="/img/false.png" alt="" className="fav_false" />
                                </div>
                                <div className="col-md-3">
                                    <div className="fav_img_box">
                                        <img src={product.get_image} alt="" className="fav_img" />
                                    </div>
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <div className="fav_descr">
                                        {product.name}
                                    </div>
                                </div>
                                <div className="col-md-1">

                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <div className="fav_sale">
                                        {product.price} {getText("sum")}
                                    </div>
                                </div>
                                <div onClick={() => detail(product.id)} className="col-md-1 d-flex align-items-center  justify-content-center">
                                    <img src="/img/view.png" alt="" className="fav_view" />
                                </div>
                            </div>
                        )
                    })}

                    {/* <div className="row">
                        {items.map((porduct) => {
                            return (
                                <div className="col-12 ">
                                    <div className="fav_col">
                                        <div className="fav_col_img">
                                            <img src="/img/fav_1.png" alt="" />
                                        </div>
                                        <div className="fav_col_h">{porduct.name}</div>
                                        <div className="fav_col_p">{porduct.price}</div>
                                        <div className="fav_col_box">
                                            <a href="" className="fav_col_main fav_col_main_line">
                                                <img src="/img/view_2.png" alt="" />
                                                <div className="fav_col_main_name">Подробнее</div>
                                            </a>
                                            <a href="" className="fav_col_main">
                                                <img src="/img/false_2.png" alt="" />
                                                <div className="fav_col_main_name">Подробнее</div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div> */}
                </div>
            </div>
        </>
    )
}

export default Favorite