import React from 'react'
import Layout from '@/components/layout/Layout'
import CategoryProduct from '@/components/category/categoryProduct/CategoryProduct'
import CustomSelect from '@/components/common/custom-input/CustomSelect'
import CustomInput from '@/components/common/custom-input/CustomInput'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import { BiSearch } from 'react-icons/bi'
import { PrismaClient } from '@prisma/client'
import { useRouter } from 'next/router'
import MotionReveal from '@/components/common/motion/MotionReveal'

const Index = ({products} : {products : any}) => {

    const router = useRouter();
    const {category} = router.query;


  return (
    <Layout>
        <>
        <BreadCrumd firstTitle={category as string} secondTitle='' />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <MotionReveal className="glass-card mt-2 rounded-[28px] p-5 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-5 sm:gap-0" >
                <div className="flex items-center gap-3" >
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Select</p>
                    <CustomSelect 
                        options={[
                            { value: '5', label: '5' },
                            { value: '10', label: '10' },
                            { value: '20', label: '20' },
                            { value: '50', label: '50' }
                        ]} 
                        name={''} 
                        id={''}                    
                    />
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-300">Entries</p>
                </div>
                <div className="flex items-center gap-2" >
                    <CustomInput 
                        id="search"
                        name="search"
                        type="text"
                        className=""
                        placeholder="search"
                    />
                    <button className="primary-button !rounded-2xl !px-4 !py-3" ><BiSearch size={20} /></button>
                </div>
            </div>
            </MotionReveal>
            <CategoryProduct products={products} user='User' categoryName={category as string} />
        </div>
        </>
    </Layout>
  )
}

export default Index

export async function getStaticProps({params} : any) {
    const category = params.category;
    const prisma = new PrismaClient()

    const categoryData = await prisma.category.findUnique({
        where : {
            name : category
        }
    })
    if(!categoryData) {
        await prisma.$disconnect()
        return {
            notFound : true
        }
    }
    const products = await prisma.product.findMany({
        where : {
            categoryId : categoryData?.id
        },
        include : {
            category : true
        }
    })
    await prisma.$disconnect()
    return {
      props: {
        products : JSON.parse(JSON.stringify(products))
      },
    };
}

export async function getStaticPaths() {
    const prisma = new PrismaClient()
    const categories = await prisma.category.findMany()
    const paths = categories.map((category) => ({
      params: { category: category.name },
    }))
    await prisma.$disconnect()
    return { paths, fallback: 'blocking' }
}
