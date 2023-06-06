import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../components/Header'
import back1 from '../images/head_img.png'
import { API_PATH } from '../tools/constats'
import { Rating } from 'react-simple-star-rating'
import { getText } from '../locales'
import { addToWishlist, WishlistDispatchContext } from '../contexts/wishlist'

const ProductShow = () => {
    const dispatch = useContext(WishlistDispatchContext)
    const { filterId } = useParams()
    // const [cat, setCat] = useState(JSON.parse(localStorage.getItem('CAT_ID') || ''))
    const [like, setLike] = useState()
    const [products, setProducts] = useState([])
    const [brand, setBrand] = useState([])
    const [color, setColor] = useState([])
    const [camp, setCamp] = useState([])
    const [rating, setRating] = useState(0)
    const saveBtns = useRef([]);
    const currect = useRef([])
    const [filterColors, setFilterColors] = useState([])
    const [filterBrand, setFilterBrand] = useState([])

    const handleAddToWishlist = (item, index) => {

        saveBtns.current[index].style.background = "#02897A";
        saveBtns.current[index].style.color = "#FFFFFF ";
        currect.current[index].src = "/img/right.png ";
        // document.getElementById(index).setAttribute('style', 'background:#000')

        const product = { ...item, quantity: 1 };
        addToWishlist(dispatch, product);

    };


    const handleRating = (rate) => {
        setRating(rate)
    }

    const getCamp = () => {
        axios.get(API_PATH + 'order/slider/')
            .then((res => {
                setCamp(res.data)
            }))
    }

    const getBrand = () => {
        axios.get(`${API_PATH}product/brands/?cat=${filterId}`)
            .then((res) => {
                console.log(res.data)
                setBrand(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }


    const getColors = () => {
        axios.get(`${API_PATH}product/colors/?cat=${filterId}`)
            .then((res) => {
                setColor(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getProducts = () => {
        axios.get(API_PATH + `product/?cat=${filterId}`)
            .then((res => {
                setProducts(res.data)
            }))

    }

    const navigate = useNavigate()

    // const getFilter = () => {
    //     axios.get(API_PATH + `product/?color=${filterColors}&&brand=${filterBrand}`)
    //         .then((res => {
    //             setProducts(res.data)
    //         }))
    // }

    useEffect(() => {
        // if (filterColors.length > 1 || filterBrand.length > 1) {
        //     getFilter()
        // }
        // if (filterColors.length < 1 && filterBrand.length < 1) {
        //     getProducts();
        // }

        getBrand();
        getColors();
        getCamp();
        getProducts();

    }, [filterColors, filterBrand])

    const detail = (id) => {
        localStorage.setItem("PRODUCT_ID", JSON.stringify(id))
        navigate('/card')
    }

    const addFilterBrand = (brand) => {
        const filterFindIndex = filterBrand.indexOf(brand);

        if (filterFindIndex !== -1) {
            filterBrand.splice(filterFindIndex, 1);
        } else {
            filterBrand.push(brand);
        }

        setFilterBrand([...filterBrand])
    }


    const addFilterColor = (color) => {
        const filterFindIndex = filterColors.indexOf(color);

        if (filterFindIndex !== -1) {
            filterColors.splice(filterFindIndex, 1);
        } else {
            filterColors.push(color);
        }

        setFilterColors([...filterColors])
    }

    useEffect(() => {
        axios.post(`${API_PATH}product/filter/`, {
            brands: filterBrand,
            colors: filterColors
        }).then((response) => {
            setProducts(response.data);
        })

    }, [filterBrand, filterColors])

    return (
        <>
            <Header />
            <div className="Shop">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            {camp && camp.slice(0, 1).map((item, index) => {
                                return (
                                    <div key={index} className="shop_box" style={{ backgroundImage: `url(${item.get_image})` }}>
                                        <div className="shop_text">
                                            <div className="shop_text_2">
                                                <div className="shop_name">{item.name}</div>
                                                <div className="shop_h">{item.title}</div>
                                            </div>
                                            <button className='shop_btn'><a href='/' className="shop_a">{getText("head_2_a")}</a></button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="col-12 ">
                            <div className="shop_main_box">
                                <div className="row ">
                                    <div className="col-lg-3">
                                        <div className="row">
                                            <div className="col-12 ">
                                                <div className="shop_filtr">
                                                    <div className="shop_filtr_name">
                                                        {getText("shop_filtr_name")}
                                                    </div>
                                                    {/* <input placeholder='Поиск' className='shop_filtr_inp' type="text" name="" id="" /> */}
                                                    {brand && brand.map((item, index) => {
                                                        return (
                                                            <div key={index} className="shop_filtr_box">
                                                                <div className="shop_filtr_left">
                                                                    <input
                                                                        onClick={(e) => addFilterBrand(e.target.value)}
                                                                        type="checkbox"
                                                                        name="brand"
                                                                        value={item.id}
                                                                        id="2"
                                                                        className="shop_chek" />

                                                                    <div className="shop_filtr_h">{item.name}</div></div>
                                                                <div className="shop_filtr_right">
                                                                    <div className="shop_filtr_p">{item.products_count}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}

                                                    {/* {brand && brand.map((item, index) => {
                                                        return (
                                                            <div key={index} className="shop_filtr_box">
                                                                <div className="shop_filtr_left">
                                                                    <input
                                                                        onClick={(e) => addFilterBrand(e.target.value)}
                                                                        type="checkbox"
                                                                        name="brand"
                                                                        value={`${index}`}
                                                                        id="2"
                                                                        className="shop_chek" />

                                                                    <div className="shop_filtr_h">{index}</div></div>
                                                                <div className="shop_filtr_right">
                                                                    <div className="shop_filtr_p">{item.products_count}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })} */}

                                                    <div onClick={() => setFilterBrand('')} className="shop_filtr_clean">{getText("shop_filtr_clean")}</div>
                                                </div>
                                            </div>
                                            <div className="col-12 mt-5">
                                                <div className="shop_filtr">
                                                    <div className="shop_filtr_name">
                                                        {getText("shop_filtr_name_2")}
                                                    </div>
                                                    {/* <input placeholder='Поиск' className='shop_filtr_inp' type="text" name="" id="" /> */}
                                                    {color && color.map((item, index) => {
                                                        return (
                                                            <div key={item.id} className="shop_filtr_box">
                                                                <div className="shop_filtr_left">
                                                                    <input onClick={(e) => addFilterColor(e.target.value)}
                                                                        type="checkbox"
                                                                        name='filter'
                                                                        value={item.id}
                                                                        id='1'
                                                                        className="shop_chek" />
                                                                    <div className="shop_filtr_h">{item.name}</div></div>
                                                                <div className="shop_filtr_right">
                                                                    <div className="shop_filtr_p">{item.products_count}</div>
                                                                </div>
                                                            </div>
                                                        )
                                                    })}
                                                    <div onClick={() => setFilterColors('')} className="shop_filtr_clean">{getText("shop_filtr_clean")}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-9">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="row">


                                                    {products && products.map((item, index) => {
                                                        return (
                                                            <div key={index} className="col-4 mb-4 deal_main">
                                                                <div className="main_main">
                                                                    <div>
                                                                        <div onClick={() => detail(item.id)} className="main_box_img">
                                                                            <img src={item.get_image} alt="" className="main_img" />
                                                                        </div>
                                                                        <div className="main_h">
                                                                            {item.name.slice(0, 100)}...
                                                                        </div>
                                                                    </div>
                                                                    <div className="main_text">


                                                                        <div className="main_p">
                                                                            {item.description.slice(0, 100)}...
                                                                        </div>
                                                                        <div className="main_sale">
                                                                            {item.price} {getText("sum")}
                                                                        </div>

                                                                        <div className="main_price">
                                                                            <div className="main_left">
                                                                                <Rating className='main_left_star'
                                                                                    initialValue={item.get_rating} />
                                                                                <div className="main_star_h">{item.get_rating}
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

export default ProductShow