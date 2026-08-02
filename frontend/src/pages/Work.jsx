import React from 'react'
import WorkHero from '../components/work/WorkHero'
import WorkShowcase from '../components/work/WorkShowcase'
import Navbar from '../components/Navbar'
import CTA from '../components/work/CTA'

const Work = () => {
  return (
    <div>
      <Navbar visible={true}/>
        <WorkHero />
        <WorkShowcase />
        <CTA />
    </div>
  )
}

export default Work