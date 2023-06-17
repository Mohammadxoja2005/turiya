import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import { getText } from '../locales'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_PATH } from '../tools/constats'

const Politic = () => {
    const [politicsData, setPoliticsData] = useState([]);

    useEffect(() => {
        axios.get(`${API_PATH}order/politics`)
            .then((response) => {
                setPoliticsData(response.data)
            })
    }, [])

    console.log(politicsData);

    return (
        <>
            <Header />

            <div className="Politic">
                <div className="politic_container">
                    <div className="row">
                        <div className="col-12">
                            <div className="pol_link">
                                <Link to="/" className="pol_a">{getText("header_5")} /</Link>
                                <div className="pol_a_h">
                                    Политика конфиденциальности
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="pol_name">
                                Политика
                            </div>

                            <div>
                                {politicsData && politicsData.map((politic_data) => {
                                    return (
                                        <div className='pub_container'>
                                            <p className="pol_h">{politic_data.title}</p>
                                            <div className="pol_p" dangerouslySetInnerHTML={{ __html: politic_data.description }} />
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

export default Politic