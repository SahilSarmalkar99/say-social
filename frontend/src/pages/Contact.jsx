import React from 'react'
import ContactHero from '../components/contact/ContactHero'
import ContactSection from '../components/contact/ContactForm'
import ContactForm1 from '../components/contact/ContactFrom1'
import CommonFooter from '../components/CommonFooter'
import Navbar from '../components/Navbar'

const Contact = () => {
  return (
    <div>
      <Navbar visible={true} />
        {/* <ContactHero />
        <ContactSection />
        <CommonFooter /> */}
        <ContactForm1 />
    </div>
  )
}

export default Contact