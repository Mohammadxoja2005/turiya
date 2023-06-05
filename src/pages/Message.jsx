import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { API_PATH } from '../tools/constats';

const Message = ({ message }) => {
    const products = localStorage.getItem('cartItems');
    const userToken = localStorage.getItem('userToken');
    const [status, setStatus] = useState(false);

    const config = {
        headers: {
            Authorization: `token ${userToken}`
        }
    }

    useLayoutEffect(() => {

        if (products && userToken) {
            setStatus(true);
        }

        if (status) {
            axios.post(`${API_PATH}order/create/`, JSON.parse(products), config)
                .then((response) => {
                    console.log(response)
                })
        }

    }, [status])

    return (
        <div className='container'>

            <p>order completed . thanks for purschase our product</p>

        </div>
    )
}

export default Message