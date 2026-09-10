import React from 'react'
import Navbar from './Components/Navbar'
import ScrollProgressBar from './Components/ScrollProgressBar'
import Hero from './Pages/Hero'
import About from './Pages/About'
import StatsRow from './Components/StatsRow'
import Projects from './Pages/Projects'
import ReviewsSection from './Components/ReviewsSection'
import TechStack from './Pages/TechStack'
import Experience from './Pages/Experience'
import Contact from './Pages/Contact'

const Home = () => {
  return (
    <div className='w-full min-h-screen bg-[#0b0f1a]'>
        <ScrollProgressBar />
        <Navbar/>
        <Hero/>
        <About/>
        <StatsRow/>
        <Projects/>
        <ReviewsSection/>
        <TechStack/>
        <Experience/>
        <Contact/>
    </div>
  )
}

export default Home