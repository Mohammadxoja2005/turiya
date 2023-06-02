import React from 'react'
import Deal from '../components/Deal'
import Header from '../components/Header'
import HeadMain from '../components/HeadMain'
import Interesting from '../components/Interesting'

const Home = () => {
    return (
        <>
            <Header />
            <HeadMain />
            <Deal />
            <Interesting />
        </>
    )
}

export default Home