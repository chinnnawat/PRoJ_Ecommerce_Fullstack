import React from 'react'
import Header from './component/Header'
import { Container } from 'react-bootstrap'
import Footer from './component/Footer'
import HomeScreen from './screens/HomeScreen'

const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          <h1>Welcome To Phihong</h1>
        </Container>
        <Container>
          <HomeScreen/>
        </Container>
      </main>
      <Footer/>
    </>
  )
}

export default App