import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import { cartItems } from '@prisma/client'
import { useCartContext } from '@/context/cartContext'
import { Button, Modal } from 'flowbite-react';
import Link from 'next/link';
import MotionReveal from '../common/motion/MotionReveal';

const CartItem = ({item} : {item : any}) => {

    const {updatecart, getCartItems} = useCartContext();
    const [qty, setQty] = useState(parseInt(item.quantity) || 1);
    const [openModal, setOpenModal] = useState(false);

    // useEffect(() => {
    //   updatecart({id: item.id, quantity : qty});
    // }, [qty])

    const changeQty = (operation : "+" | "-") => {
        if(operation === "-" && qty === 1){
            setOpenModal(true);
        } else{
            if(operation === "+"){
                setQty((prev)=> prev+1)
            } else {
                setQty((prev)=> prev-1)
            }
            updatecart({id: item.id, quantity : qty + (operation === "+" ? 1 : -1)});
        }
    }

    const removeItem = () => {
        updatecart({id: item.id, quantity : 0});
        setOpenModal(false);
        setQty(0);
    }
    

  return (
    <>
        <MotionReveal>
        <div className="glass-card flex justify-between items-center rounded-[24px] p-4 md:px-8 md:py-5" >
                <Link href={`/${item?.product?.category?.name}/${item?.product?.name}`} className='flex items-center gap-3 md:gap-5' style={{flex : 3}} >
                            <div className="h-32 md:h-36 flex-1 rounded-[20px] bg-white/70 p-3 dark:bg-slate-900/60" style={{flex : 1}} >
                                <div className="w-full h-full relative">
                                    <Image src={item.product.imagePath} alt="phone" fill={true} style={{objectFit : "contain"}} />
                                </div>
                            </div>
                    <div className='flex-1' style={{flex : 3}} >
                        <h1 className="text-sm md:text-lg font-semibold my-2" >{item?.product?.name}</h1>
                        <p className="text-blue-600 dark:text-blue-300 my-2 text-sm md:text-md" >{item?.product?.price} RS</p>
                    </div>
                </Link>
            <div className='' style={{flex : 1}} >
                <div className="flex justify-end items-center gap-3 md:gap-5" >
                    <button onClick={()=>changeQty("-")} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white/70 dark:border-slate-700 dark:bg-slate-900/70" >-</button>
                    <p className="text-xl font-semibold" >{qty}</p>
                    <button onClick={()=>changeQty("+")} className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-300 bg-white/70 dark:border-slate-700 dark:bg-slate-900/70" >+</button>
                </div>
            </div>
        </div>
        </MotionReveal>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <Modal.Header>Warning</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        Do you want to remove this item from cart ?
                    </p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button color="red" onClick={() => removeItem() }>Remove</Button>
                <Button color="gray" onClick={() => setOpenModal(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    
  )
}

export default CartItem
