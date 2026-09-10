import React from 'react'
import Navbar from './Components/Navbar'
import Hero from './Pages/Hero'
import About from './Pages/About'
import StatsRow from './Components/StatsRow'
import Projects from './Pages/Projects'
import ReviewsSection from './Components/ReviewsSection'
import ReviewPromptToast from './Components/ReviewPromptToast'
import TechStack from './Pages/TechStack'
import Experience from './Pages/Experience'
import Contact from './Pages/Contact'

const Home = () => {
  return (
    <div className='w-full min-h-screen bg-[#0b0f1a]'>
        <Navbar/>
        <Hero/>
        <About/>
        <StatsRow/>
        <Projects/>
        <ReviewsSection/>
        <ReviewPromptToast/>
        <TechStack/>
        <Experience/>
        <Contact/>
    </div>
  )
}

export default Home