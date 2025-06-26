import React from 'react'
import Header from '../components/Header.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Design from '../components/Design.jsx'
import LivingRoom from '../components/LivingRoom.jsx'
import BedRoom from '../components/BedRoom.jsx'
import Stairs from '../components/Stairs.jsx'
import Footer from '@/components/Footer.jsx'

const Home = () => {
   
  return (
    <>
      <Header />
      <SectionTitle text={'Latest Designs'} />
      <Design />
      <SectionTitle text={'Latest Furniture Ideas'} />
      <BedRoom />
      <SectionTitle text={'Best Livingroom Designs'}/>
      <LivingRoom />
      <SectionTitle text={'Beautiful Staicase Designs'} />
      <Stairs />
      <Footer />
    </>
  )
}

export default Home
