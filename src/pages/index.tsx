import Layout from "@/components/layout/Layout";
import Container from "@/components/common/container/Container";
import Slider from "@/components/home/slider/Slider";
import OfferCard from "@/components/home/card/OfferCard";
import ProductList from "@/components/home/product-list/ProductList";
import styles from './styles.module.css'
import ExploreCategory from "@/components/home/explore-category/ExploreCategory";
import { PrismaClient, category, product } from "@prisma/client";
import MotionReveal from "@/components/common/motion/MotionReveal";

interface Props {
  categories: category[];
  products: product[];
  faeturedProducts: product[];
  bestSeller: product[];
  offered: product[];
}

export default function Home({categories, products, bestSeller, faeturedProducts, offered} : Props) {
  return (
    <Layout>
      <Container className={"my-5 mt-8"}>
        <MotionReveal className={"grid grid-cols-12 gap-5"}>
          <div
            className={"hero-surface col-span-12 overflow-hidden p-1 lg:col-span-8 " + styles.offBanner}
          >
            <div className="rounded-[24px]">
              <Slider featured={faeturedProducts} />
            </div>
          </div>
          <div className="col-span-12 h-auto lg:col-span-4 lg:h-full">
            <div className="flex h-full flex-col gap-4 sm:gap-5 md:flex-row lg:flex-col">
              {
                bestSeller && bestSeller[0] && <div className="flex-1"><OfferCard product={bestSeller[0]} /></div>
              }
              {
                offered && offered[0] && <div className="flex-1"><OfferCard product={offered[0]} /></div>
              }
            </div>
          </div>
        </MotionReveal>
        <ProductList products={products} bestSeller={bestSeller} featured={faeturedProducts} offered={offered} />
        <ExploreCategory categories={categories} />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const prisma = new PrismaClient()

  const categories = await prisma.category.findMany()
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })

  const faeturedProducts = await prisma.product.findMany({
    where: {
      featured: true
    },
    include: {
      category: true
    }
  })

  const bestSeller = await prisma.product.findMany({
    where: {
      bestSeller: true
    },
    include: {
      category: true
    }
  })

  const offered = await prisma.product.findMany({
    where: {
      offered: true
    },
    include: {
      category: true
    }
  })

  return {
    props: {
      categories : JSON.parse(JSON.stringify(categories)),
      products : JSON.parse(JSON.stringify(products)),
      faeturedProducts : JSON.parse(JSON.stringify(faeturedProducts)),
      bestSeller : JSON.parse(JSON.stringify(bestSeller)),
      offered : JSON.parse(JSON.stringify(offered))
    },
    revalidate: 30
  };
}
