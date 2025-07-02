import React from 'react'
import Header from '../components/Header.jsx'
import SectionTitle from '../components/SectionTitle.jsx'
import Design from '../components/Design.jsx'
import LivingRoom from '../components/LivingRoom.jsx'
import BedRoom from '../components/BedRoom.jsx'
import Stairs from '../components/Stairs.jsx'
import Footer from '@/components/Footer.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const Home = () => {
   const auth = useAuth()
   const userRole = auth?.user?.role
  //  console.log("Type: ",userRole);
   
  return (
    <>
      <Header />
      {
        userRole === "user" && <>
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
      }
      
    </>
  )
}

export default Home
