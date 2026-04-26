import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { useRouter } from 'next/router';
import MotionReveal from '@/components/common/motion/MotionReveal';

const AddCategoryCard = () => {
  const router = useRouter()
  return (
    <MotionReveal>
      <div onClick={()=>router.push("/admin/category/add-category")} className='glass-card col-span-1 cursor-pointer p-1'>
        <div className="flex min-h-[212px] flex-col items-center justify-center rounded-[22px] border border-dashed border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 text-center dark:border-blue-400/30 dark:from-slate-900 dark:to-slate-800">
          <IoMdAdd className="mx-auto text-4xl text-blue-500" />
          <p className="mt-3 text-lg font-semibold" >Add Category</p>
          <p className="mt-2 max-w-[14rem] text-sm text-slate-500 dark:text-slate-300">
            Create a new category card with the same polished admin experience.
          </p>
        </div>
      </div>
    </MotionReveal>
  )
}

export default AddCategoryCard
