import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'

import AppAppBar from './components/AppAppBar'
import FAQ from './components/FAQ'
import Features from './components/Features'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Highlights from './components/Highlights'
import LogoCollection from './components/LogoCollection'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'

export default function Home() {
  return (
    <>
      <AppAppBar />
      <Hero />
      <Box>
        <LogoCollection />
        <Features />
        <Divider />
        <Testimonials />
        <Divider />
        <Highlights />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </Box>
    </>
  )
}
