import React, {useEffect, useState} from 'react'
import Layout from '@/components/layout/Layout'
import BreadCrumd from '@/components/category/breadCrumd/BreadCrumd'
import Image from 'next/image'
import ReactStars from "react-rating-stars-component";
import Review from '@/components/common/review/Review';
import OverallRating from '@/components/product/OverallRating';
import { PrismaClient, User, product } from '@prisma/client';
import { useRouter } from 'next/router';
import { useCartContext } from '@/context/cartContext';
import { useWishlistContext } from '@/context/wishlistContext';
import { useUserContext } from '@/context/userContext';
import AddReview from '@/components/product/AddReview';
import BtnUnderline from '@/components/common/custom-button/BtnUnderline';
import { IoCartOutline, IoHeartOutline, IoHeartSharp  } from "react-icons/io5";
import MotionReveal from '@/components/common/motion/MotionReveal';

const ProductCard = ({product, reviewsData} : {product : product, reviewsData : any}) => {
    const router = useRouter();
    const {addItem, items} = useCartContext();
    const { addIteminwish, deletewishlist, items : wishlistItems } = useWishlistContext();
    const {user} : {user : User | null} = useUserContext();
    const {category, product: productName} = router.query;
    const [reviews, setReviews] = useState<any>(reviewsData || []);
    const [alredyReviewed, setAlredyReviewed] = useState<boolean>(false);

    const isItemExist = items?.find((item : any) => item.product.id === product.id);
    const data:any = wishlistItems?.filter((item : any) => item.product.id === product.id)

    const getReviews = async  () => {
        fetch(`/api/product/${product.id}/review`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            setReviews(data);
        })
        .catch(err => console.log(err))
    }

    useEffect(() => {
        if(user){
            const alredyReviewed = reviews.some((review : any) => review.userId == (user as any).id)
            setAlredyReviewed(alredyReviewed);
        }
    }, [user, reviews])

  return (
    <Layout>
        <>
            <BreadCrumd firstTitle={category as string} secondTitle={productName as string} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
                <MotionReveal className="grid grid-cols-1 md:grid-cols-5 gap-5 my-5" >
                    <div className='hero-surface col-span-2 h-96 md:h-auto p-10' >
                        <div className='h-full relative' >
                            <Image src={product?.imagePath || '/assets/images/headphone.png'} alt="phone" fill={true} style={{objectFit : "contain"}}  />
                        </div>
                    </div>
                    <div className='hero-surface col-span-3 p-6 md:p-8' >
                        <p className="pill-badge mb-4">Product Details</p>
                        <h1 className="text-3xl font-semibold" >{product?.name}</h1>
                        <div className="mt-3 flex items-center gap-3" >
                           <ReactStars
                                count={5}
                                value={product?.rating}
                                onChange={()=>{}}
                                size={25}
                                activeColor="#ffd700"
                                edit={false}
                            /> 
                            <p className="my-3 text-sm text-slate-500 dark:text-slate-300" >{`(${reviews.length} reviews)`}</p>
                        </div>
                        <h3 className="mt-3 text-xl font-medium" >Description</h3>
                        <p className="mt-4 text-sm font-light text-slate-500 dark:text-slate-300" >{product?.description}</p>
                        <p className="mt-4 text-2xl font-bold text-blue-600 dark:text-blue-300" >Rs. {product?.price}</p>
                        <div className="mt-3 flex items-center" >
                            <p className="text-slate-400" >Offer :</p>
                            <p className="ml-2 font-medium text-blue-600" >{product?.offer}% Cashback</p>
                        </div>
                        <div className="mt-1 flex items-center" >
                            <p className="text-slate-400" >Available :</p>
                            <p className="ml-2 font-medium text-green-600" >{product?.availability}</p>
                        </div>
                        <div className="mt-6 flex flex-wrap gap-5 items-center" >
                            <button onClick={()=> router.push('/checkout/'+ product?.id) } className="primary-button" >Buy Now</button>
                            <div className="flex gap-5 items-center" >
                                {
                                    isItemExist && <div>
                                        <BtnUnderline onClick={()=> router.push('/cart')} >Go to cart <IoCartOutline size={20} className='inline ml-1' /></BtnUnderline>
                                    </div> || <div>
                                        <BtnUnderline onClick={()=> addItem(product?.id)} >Add to Cart <IoCartOutline size={20} className='inline ml-1' /></BtnUnderline>
                                    </div>
                                }
                                {
                                    data && data.length > 0 && data[0].product.id === product?.id &&
                                    <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-400/30 dark:bg-rose-500/10" onClick={()=> deletewishlist(data[0])}>
                                        <IoHeartSharp size={23} />
                                    </button> || <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-rose-500 dark:border-slate-700 dark:bg-slate-900" onClick={()=> addIteminwish(product?.id)}>
                                        <IoHeartOutline size={23} />
                                    </button>
                                }
                            </div>
                        </div>
                    </div>
                </MotionReveal>
                <div className="mt-10">
                    {
                        user && (
                            !alredyReviewed &&
                            <>
                                <h1 className="mb-4 text-2xl font-medium" >Reviews</h1>
                                <div className="glass-card rounded-[28px] p-6">
                                    <AddReview productid={product.id} callBack={getReviews} /> 
                                </div>
                            </>
                        )
                    }
                    {
                        reviews.length > 0 &&
                        <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-5" >
                            <div className="glass-card col-span-3 order-last rounded-[28px] p-6 md:order-first" >
                                <h3 className="text-xl font-medium" >All Reviews</h3>
                                {
                                    reviews && reviews.length > 0 && reviews.map((review : any, index : number) => (
                                        <Review key={index} review={review} />
                                    )) || <p className="text-sm text-gray-500" >No reviews yet</p>
                                }
                            </div>
                            <div className="glass-card col-span-2 mb-4 rounded-[28px] p-6 md:mb-0" >
                                <OverallRating reviews={reviews} />
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
    </Layout>
  )
}

export default ProductCard

export async function getStaticProps({params} : any) {
    const product = params.product;

    const prisma = new PrismaClient();
    const productData = await prisma.product.findUnique({
        where: {
            name: product
        }
    });

    const reviews = await prisma.review.findMany({
        where: {
            productId: productData?.id
        },
        include: {
            user: true
        }
    });

    await prisma.$disconnect();

    return {
        props: {
            product : JSON.parse(JSON.stringify(productData)),
            reviewsData : JSON.parse(JSON.stringify(reviews))
        },
        revalidate: 30
    }
}

export async function getStaticPaths() {
    const prisma = new PrismaClient();
    const products = await prisma.product.findMany();
    const categories = await prisma.category.findMany();

    const paths = products.map((product : any) => {
        return {
            params: {
                category: categories.find((category : any) => category.id === product.categoryId)?.name,
                product: product.name
            }
        }
    });

    await prisma.$disconnect();

    return {
        paths,
        fallback: 'blocking'
    }
}
