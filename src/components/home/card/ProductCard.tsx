import React, {useState} from "react";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import styles from "./card.module.css";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";
import { IoCartOutline, IoHeartOutline, IoHeartSharp  } from "react-icons/io5";
import { product } from "@prisma/client";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { Toast } from 'flowbite-react';
import { HiX } from 'react-icons/hi';
import { useCartContext } from "@/context/cartContext";
import { useWishlistContext } from "@/context/wishlistContext";
import MotionReveal from "@/components/common/motion/MotionReveal";

const ProductCard = ({product, user, categoryName} : {product : product, user : "Admin" | "User", categoryName? : string}) => {
  const router = useRouter();
  const ratingChanged = () => {};
  const { addItem, items : cartItems, removeItem } = useCartContext();
  const { addIteminwish, deletewishlist, items : wishlistItems } = useWishlistContext();
  const [error, setError] = useState<string | null>(null);

  const handleProductClick = () => {
    router.push(`/${categoryName}/${product.name}`);
  }

  const deleteHandler = () => {
    fetch('/api/product/'+ product.id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') || ''
        }
    })
    .then(res => res.json())
    .then(data => {
        if(data.error){
            setError(data.message);
        }
        else{
            setError(null);
            router.back();
        }
    })
  }

  const data:any = wishlistItems.filter((item : any) => item.product.id === product.id)
  const data2:any = cartItems.filter((item : any) => item.product.id === product.id)

  return (
    <MotionReveal className="h-full">
      <div className={`relative col-span-2 h-full overflow-hidden transition duration-300 hover:-translate-y-1 sm:col-span-2 md:col-span-2 lg:col-span-1 ${styles.productcard}`}>
        <div className="glass-card h-full overflow-hidden p-1">
          <div className="flex h-full flex-col rounded-[22px] bg-white/80 p-4 dark:bg-slate-900/70">
            <div onClick={()=> user == 'User' ?  handleProductClick() : null } className={"flex flex-1 cursor-default flex-col " + styles.cardMainContent}>
              <div className={`${user == "User" && 'cursor-pointer '}relative h-48 w-full overflow-hidden rounded-[20px] bg-gradient-to-br from-slate-100 to-blue-50 dark:from-slate-800 dark:to-slate-900 sm:h-60 md:h-72 ${styles.imageWrap}`}>
                <Image
                  src={product.imagePath ? product.imagePath : "/assets/images/headphone.png"}
                  alt={product.name}
                  fill={true}
                  style={{ objectFit: "contain", padding: 20 }}
                />
              </div>
              <div className="mt-4 flex min-h-[7.5rem] flex-col gap-2">
                <div className="flex items-start justify-between gap-3">
                  <h2 className={`text-sm font-semibold sm:text-base ${styles.cardTitle}`}>{product.name}</h2>
                  <ReactStars
                    count={5}
                    value={product.rating}
                    onChange={ratingChanged}
                    size={18}
                    activeColor="#fbbf24"
                    edit={false}
                  />
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-300">Premium tech pick</p>
                <p className="text-lg font-semibold text-blue-600 dark:text-blue-300">Rs. {product.price}</p>
              </div>
            </div>

            <div className={"relative mt-4 flex w-full items-center justify-between gap-3 " + styles.cardBtn} >
              {user === "User" ? (
                <>
                  {data2 && data2.length > 0 && data2[0].product.id === product.id ? (
                    <BtnUnderline className="" onClick={()=> removeItem(data2[0], 0)} width={"w-20"} >
                      <div className="flex gap-2 items-center" ><IoCartOutline size={18} /> <p>Remove</p></div>
                    </BtnUnderline>
                  ) : (
                    <BtnUnderline className="" onClick={()=> addItem(product.id)} width={"w-16"} >
                      <div className="flex gap-2 items-center" ><IoCartOutline size={18} /> <p>Add to Cart</p></div>
                    </BtnUnderline>
                  )}
                  {data && data.length > 0 && data[0].product.id === product.id ? (
                    <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-400/30 dark:bg-rose-500/10" onClick={() => deletewishlist(data[0])}>
                      <IoHeartSharp size={22} />
                    </button>
                  ) : (
                    <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-rose-500 dark:border-slate-700 dark:bg-slate-900" onClick={() => addIteminwish(product.id)}>
                      <IoHeartOutline size={22} />
                    </button>
                  )}
                </>
              ) : (
                <>
                  <BtnUnderline className="" onClick={()=>{router.push(`/admin/category/${categoryName}/${product.name}`)}} width={"w-16"} >
                    <div className="flex gap-2 items-center" ><FaRegEdit size={18} /> <p>Edit</p></div>
                  </BtnUnderline>
                  <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-400/30 dark:bg-rose-500/10" onClick={deleteHandler}>
                    <MdOutlineDeleteOutline size={22} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        {error && (
          <Toast className='absolute right-2 top-2' >
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{error}</div>
            <Toast.Toggle onDismiss={() => setError(null)} />
          </Toast>
        )}
      </div>
    </MotionReveal>
  );
};

export default ProductCard;
