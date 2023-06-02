import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CartDispatchContext, CartStateContext, toggleCartPopup } from '../contexts/cart'
import { CommonDispatchContext, setSearchKeyword } from '../contexts/common'
import { WishlistStateContext } from '../contexts/wishlist'
import { getLanguage, getText } from '../locales'
import { LANGUAGE } from '../tools/constats'
import { USER_TOKEN } from '../tools/constats'

const Navbar = () => {
    const navigate = useNavigate()
    const [navbar, setNavbar] = useState(false);
    const [token, setToken] = useState((localStorage.getItem('turiya') || ''));

    const { items: cartItems, isCartOpen } = useContext(CartStateContext);
    const commonDispatch = useContext(CommonDispatchContext);
    const cartDispatch = useContext(CartDispatchContext);
    const cartQuantity = cartItems.length;

    const cartTotal = cartItems
        .map((item) => item.price * item.quantity)
        .reduce((prev, current) => prev + current, 0);

    const { items: wishlistItems } = useContext(WishlistStateContext);

    const wishlistDispatch = useContext(CartDispatchContext);

    const wishlistQuantity = wishlistItems.length;
    const wishlistTotal = wishlistItems
        .reduce((prev, current) => prev + current, 0);

    const handleSearchInput = (event) => {
        return setSearchKeyword(commonDispatch, event.target.value);
    };

    const handleCartButton = (event) => {
        event.preventDefault();
        return toggleCartPopup(cartDispatch);
    };

    const changeNavbar = () => {
        if (window.scrollY >= 1) {
            setNavbar(true)
        }
        else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll', changeNavbar)

    const changeLanguage = (e) => {
        localStorage.setItem(LANGUAGE, e.target.value);
        document.location.reload(true)
    }

    const post = () => {
        if (token.length < 10) {
            navigate('/login')
        }
        else {
            navigate('/profile')
        }
    }

    return (
        <>
            <div className="top"></div>

            <div className={`Navbar ${navbar ? 'active' : ''}`}>
                <div className="navbar_container">

                    <div className="col-6 d-flex align-items-center">
                        <Link to="/" className="nav_a">
                            <img src="/img/logo.png" alt="" className="nav_logo" />
                        </Link>
                        <div className="nav_inp">
                            <img src="/img/search.png" alt="" className="nav_inp_search" />
                            <input placeholder='Поиск' type="text" name="" id="" className="nav_inp" />
                        </div>
                    </div>
                    <div className="col-6  nav_col_box">
                        <div className="nav_soc_box">
                            <a href="" className="nav_soc">
                                <img src="/img/telegram.png" alt="" className="nav_soc_img" />
                            </a>
                            <a href="" className="nav_soc">
                                <img src="/img/instagram.png" alt="" className="nav_soc_img" />
                            </a>
                            <a href="" className="nav_soc">
                                <img src="/img/facebook.png" alt="" className="nav_soc_img" />
                            </a>
                            <a href="" className="nav_soc">
                                <img src="/img/youtube.png" alt="" className="nav_soc_img" />
                            </a>
                        </div>

                        <div className="nav_box">
                            <img src="/img/icon_world.png" alt="" className="nav_icon" />
                            <select onChange={changeLanguage} className='nav_h' name="" id="">
                                <option className='nav_h' selected={getLanguage() === 'uzb'} value="uzb">O'zbekcha</option>
                                <option className='nav_h' selected={getLanguage() === 'rus'} value="rus">Русский</option>
                                <option className='nav_h' selected={getLanguage() === 'eng'} value="eng">English</option>
                            </select>
                        </div>
                        <Link to="/favourite" className="nav_box">
                            <div className="nav_box_2">
                                <div className="nav_circle">{wishlistQuantity}</div>
                                <img src="/img/icon_love.png" alt="" className="nav_icon" />
                            </div>
                            <div className="nav_h">
                                {getText("nav_1")}
                            </div>
                        </Link>
                        <Link to="basket" className="nav_box">
                            <div className="nav_box_2">
                                <div className="nav_circle">{cartQuantity}</div>
                                <img src="/img/icon_box.png" alt="" className="nav_icon" />
                            </div>
                            <div className="nav_h">
                                {getText("nav_2")}
                            </div>
                        </Link>
                        <div onClick={post} className="nav_box">
                            <img src="/img/icon_prof.png" alt="" className="nav_icon" />
                            <div className="nav_h">
                                {getText("nav_3")}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="Navbar_2">
                <div className="container">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-evenly">
                            <a href='' className="nav_2_box">
                                <img src="/img/media_prof.png" alt="" className="nav_2_img" />
                                <div className="nav_2_name">{getText("nav_4")}</div>
                            </a>
                            <div className="nav_2_box">
                                <img src="/img/media_lang.png" alt="" className="nav_2_img" />
                                <select onChange={changeLanguage} className='nav_2_sel' name="" id="">
                                    <option className='nav_2_opt' selected={getLanguage() === 'uzb'} value="uzb">O'zbekcha</option>
                                    <option className='nav_2_opt' selected={getLanguage() === 'rus'} value="rus">Русский</option>
                                    <option className='nav_2_opt' selected={getLanguage() === 'eng'} value="eng">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar