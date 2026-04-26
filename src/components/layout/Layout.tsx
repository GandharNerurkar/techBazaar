import React, { ReactNode } from 'react'
import Navbar from '../common/navbar/Navbar'
import Footer from '../common/footer/Footer'
import CustomToast from '../common/feedback/CustomToast'

const Layout = ({children} : {children : ReactNode}) => {
    return (
        <main className="app-shell" >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-80 floating-grid opacity-40" />
                <Navbar />
                <CustomToast />
                <div className="relative z-10">{children}</div>
                <Footer />
        </main>
    )
}

export default Layout
