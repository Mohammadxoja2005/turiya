import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { getText } from '../locales'
import axios from 'axios'
import { API_PATH } from '../tools/constats'

const Public = () => {

    const [publicData, setPublicData] = useState([]);

    useEffect(() => {
        axios.get(`${API_PATH}order/politics`)
            .then((response) => {
                setPublicData(response.data)
            })
    }, [])

    console.log(publicData)

    return (

        <>
            <Header />
            <div className="Public">
                <div className="public_container">
                    <div className="row">
                        <div className="col-12">
                            <div className="pub_link">
                                <a href="" className="pub_a">{getText("header_6")} /</a>
                                <div className="pub_a_h">
                                    Публичная оферта
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="pub_name">
                                Публичная оферта
                            </div>

                            <div>
                                {publicData && publicData.map((public_data) => {
                                    return (
                                        <div className='pub_container' >
                                            <p className="pub_h"> {public_data.title}</p>
                                            <div className="pub_p" dangerouslySetInnerHTML={{ __html: public_data.description }} />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Public