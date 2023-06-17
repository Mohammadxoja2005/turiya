import React, {useEffect} from 'react'
import Header from '../components/Header'
import { getText } from '../locales'
import { Link } from 'react-router-dom'

const About = () => {


    return (
        <>
            <Header />
            <div className="About">
                <div className="about_container">
                    <div className="row justify-content-between">
                        <div className="col-12">
                            <div className="ab_link">
                                <Link to="/" className="ab_a">{getText("header_2")} /</Link>
                                <div className="ab_a_h">
                                    {getText("header_4")}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="ab_name">
                                {getText("header_4")}
                            </div>
                            <div className="ab_p">
                                {getText("about_text_bullet1")}
                                <br />
                                <br />
                                {getText("about_text_bullet2")}
                            </div>
                            <div className="ab_p">
                                {getText("about_text_bullet3")}
                                <br />
                                <br />
                                {getText("about_text_bullet4")}
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <img src="/img/ab_1.png" alt="" className="ab_img" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About