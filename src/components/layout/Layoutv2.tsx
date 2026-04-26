import React, { ReactNode } from 'react'
import OnboardNavbar from '../common/navbar/OnboardNavbar'
import Footer from '../common/footer/Footer'

const Layoutv2 = ({children} : {children : ReactNode}) => {
    return (
        <main className="app-shell">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-72 floating-grid opacity-30" />
                <OnboardNavbar />
                <div className="relative z-10">{children}</div>
        </main>
    )
}

export default Layoutv2
