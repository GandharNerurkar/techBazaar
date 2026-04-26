import React, { ReactNode } from 'react'
import AdminNavbar from '../common/navbar/AdminNavbar'
import Footer from '../common/footer/Footer'

const LayoutAdmin = ({children} : {children : ReactNode}) => {
    return (
        <main className="app-shell">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-96 floating-grid opacity-30" />
                <AdminNavbar />
                <div className="relative z-10">{children}</div>
                <Footer />
        </main>
    )
}

export default LayoutAdmin
