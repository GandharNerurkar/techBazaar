import React from 'react'
import Image from 'next/image'
import BtnUnderline from '@/components/common/custom-button/BtnUnderline'
import { useRouter } from 'next/router'
import MotionReveal from '@/components/common/motion/MotionReveal'

interface IAdminProps {
  category: any
}

const CategoryCardAdmin = ({category} : IAdminProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/admin/category/${category.name}`)
  }

  const handleBtnClick = (e:React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
    e.stopPropagation()
    router.push(`/admin/category/${category.name}/products`)
  }

  return (
    <MotionReveal>
      <div onClick={handleClick} className='glass-card group col-span-1 cursor-pointer overflow-hidden p-1'>
        <div className='flex justify-between rounded-[22px] bg-white/80 p-5 dark:bg-slate-900/70' >
          <div className='flex-1' >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400" >{category.count} Products</p>
            <p className="my-3 text-lg font-semibold md:text-2xl" >{category.name}</p>
            <BtnUnderline onClick={handleBtnClick} className="mt-3" width="w-14" >See Products</BtnUnderline>
          </div>
          <div className="relative h-36 flex-auto text-right transition-transform duration-300 group-hover:scale-105" >
            {category.imagePath && <Image src={category.imagePath} alt={category.name} fill={true} style={{objectFit : "contain"}} />}
          </div>
        </div>
      </div>
    </MotionReveal>
  )
}

export default CategoryCardAdmin
