import React, {useState} from 'react'
import ProductCard from '../card/ProductCard'
import MotionReveal from '@/components/common/motion/MotionReveal';

interface Props {
  products: any;
  bestSeller: any;
  featured: any;
  offered: any;
}

const tabData = [
  {
    id : 0,
    title : "All"
  },
  {
    id : 1,
    title : "Featured"
  },
  {
    id : 2,
    title : "Best Seller"
  },
  {
    id : 3,
    title : "Offers"
  }
]

const ProductList = ({products, bestSeller, featured, offered}: Props) => {
  const [activeTab, setActiveTab] = useState(tabData[0]);

  return (
    <MotionReveal className="mt-12 mb-10" >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="pill-badge mb-4">Exclusive Picks</p>
              <h3 className="section-title" >Exclusive Product</h3>
              <p className="section-subtitle mt-2">Switch between curated collections without changing the underlying product logic.</p>
            </div>
            <div className="glass-card flex flex-wrap gap-2 rounded-full p-2">
                {tabData.map((tab : any, index : any) => {
                  return (
                    <button
                      key={index}
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${activeTab.id === tab.id ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25" : "text-slate-500 dark:text-slate-300"}`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.title}
                    </button>
                  )
                })}
            </div>
        </div>
        <div className="mt-6 grid grid-cols-4 gap-4 sm:gap-8" >
          {
            activeTab.id === 0 && 
            products?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            }) || activeTab.id === 1 &&
            featured?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            }) || activeTab.id === 2 &&
            bestSeller?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            }) || activeTab.id === 3 &&
            offered?.map((product : any, index : any) => {
              return <ProductCard key={index} product={product} user={"User"} categoryName={product?.category?.name} />
            })
          }
          {
            activeTab.id === 0 && products?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p> 
            || 
            activeTab.id === 1 && featured?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p> 
            || 
            activeTab.id === 2 && bestSeller?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p> 
            || 
            activeTab.id === 3 && offered?.length === 0 && 
            <p className="col-span-4 text-center text-lg font-bold text-slate-500" >No Product Found</p>
          }
        </div>
    </MotionReveal>
  )
}

export default ProductList
