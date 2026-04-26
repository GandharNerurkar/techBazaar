import React from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import WishlistItem from '@/components/cart/WishlistItem'
import { PrismaClient, wishlistItems } from '@prisma/client'
import cookie from 'cookie';
import { checkIfUserExist2 } from '@/helpers/dbUtils'
import { v4 as uuidv4 } from 'uuid';
import { useWishlistContext } from '@/context/wishlistContext'

const Wishlistt = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {items} = useWishlistContext();
  return (
    <Layout>
        <BreadCrumd firstTitle='Wishlist' secondTitle='' />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5" >
                {
                    items.length > 0 ? items.map((item, index) => (
                        <WishlistItem key={index} item={item} />
                    )) : <div className="hero-surface col-span-2 px-6 py-12 text-center text-2xl font-semibold">No items in wishlist</div>
                }
            </div>
        </div>
    </Layout>
  )
}

export default Wishlistt

export const getServerSideProps = async (context : any) => {
  const redr = {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const token = cookies.token;
  if(!token){
    return redr
  }
  const user = await checkIfUserExist2(token);
  if (!user) {
    return redr
  }

  const prisma = new PrismaClient();
  const wishlist = await prisma.wishlist.findUnique({
      where: {
          userId: user.id,
      }
  });

  if(!wishlist){
    await prisma.wishlist.create({
      data: {
        id: uuidv4(),
        userId: user.id
      }
    })
  }
  await prisma.$disconnect()
  return {
      props: {
          
      },
  }
}
