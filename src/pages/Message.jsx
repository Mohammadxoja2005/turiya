import React, { useEffect, useLayoutEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom';
import { API_PATH } from '../tools/constats';

const Message = ({ message }) => {
    const { uuid } = useParams();
    const products = localStorage.getItem('cartItems');
    const location = localStorage.getItem('location');
    const userToken = localStorage.getItem('userToken');
    const navigate = useNavigate();

    const [status, setStatus] = useState(false);

    const config = {
        headers: {
            'Authorization': `token ${userToken}`,
            'uuid': `${uuid}`,
            'location': `${location}`
        },
    };

    useLayoutEffect(() => {

        if (products && userToken) {
            setStatus(true);
        }

        if (status) {
            axios.post(`${API_PATH}order/create/`, JSON.parse(products), config)
                .then((response) => {
                    localStorage.removeItem('cartItems')
                    localStorage.removeItem('location')
                })
                .then(() => {
                    navigate('/profile')
                })
                .catch((error) => {
                    console.log(error)
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