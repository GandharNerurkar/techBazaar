import React from 'react'
import MotionReveal from '@/components/common/motion/MotionReveal'

interface IProps {
    firstTitle?: string;
    secondTitle?: string;
}

const BreadCrumd = ({firstTitle, secondTitle} : IProps) => {
  return (
    <div className="page-section px-4 sm:px-6 lg:px-8">
        <MotionReveal className="max-w-7xl mx-auto">
            <div className="hero-surface flex min-h-[180px] items-center justify-center overflow-hidden px-6 py-10 text-center">
                <div>
                    <p className="pill-badge mb-4">Browse</p>
                    <div className="text-2xl font-semibold md:text-4xl" >
                        <p>{`${firstTitle && firstTitle || 'Category'} ${secondTitle && '/'+secondTitle}`}</p>
                    </div>
                </div>
            </div>
        </MotionReveal>
    </div>
  )
}

export default BreadCrumd
