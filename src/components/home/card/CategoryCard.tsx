import React from 'react'
import Image from 'next/image'
import BtnUnderline from '@/components/common/custom-button/BtnUnderline'
import { category } from '@prisma/client'
import { useRouter } from 'next/router'
import MotionReveal from '@/components/common/motion/MotionReveal'

const CategoryCard = ({category} : {category : category}) => {
  const router = useRouter();

  return (
    <MotionReveal>
      <div onClick={()=>router.push(`/${category.name}`)} className='glass-card group col-span-1 cursor-pointer overflow-hidden p-1'>
        <div className='relative flex items-center justify-between rounded-[22px] bg-white/80 px-4 py-5 dark:bg-slate-900/70'>
          <div className='flex-1'>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Top Deal</p>
            <p className="my-3 text-lg font-semibold md:text-2xl">{category.name}</p>
            <BtnUnderline onClick={()=>{}} className="mt-2" width="w-12">Shop Now</BtnUnderline>
          </div>
          <div className="relative h-36 flex-auto text-right transition-transform duration-300 group-hover:scale-105" >
            <Image src={category.imagePath!} alt={category.name} fill={true} style={{objectFit : "contain"}} />
          </div>
        </div>
      </div>
    </MotionReveal>
  )
}

export default CategoryCard
