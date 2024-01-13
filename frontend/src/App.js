import React from 'react'
import Header from './component/Header'
import { Container } from 'react-bootstrap'
import Footer from './component/Footer'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
// import FloatingActionButton from './component/FloatingAction'

const App = () => {
  return (
    <>
      <Header/>
      <main className='py-3'>
        <Container>
          {/* <h1>Welcome To Phihong</h1> */}
        </Container>
        <Container>
          {/* ใช้ Outlet แทน HomeScreen component ได้ เนื่องจากกำหนด element ของ path "/" คือ HomeScreen */}
          <Outlet/>
        </Container>
      </main>
      <Footer/>
      <ToastContainer/>
      {/* <FloatingActionButton/> */}
    </>
  )
}

export default App