import React from "react";
import Image from "next/image";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";
import Link from "next/link";
import MotionReveal from "@/components/common/motion/MotionReveal";

const OfferCard = ({product} : {product : any}) => {
  return (
    <MotionReveal className="h-full">
      <div className="hero-surface h-full overflow-hidden p-1">
        <Link href={`/${product.category.name}/${product.name}`}>
          <div className="relative flex h-full min-h-[220px] flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-cyan-50 to-blue-100 px-5 py-6 text-slate-900 sm:min-h-[250px] sm:flex-row sm:items-center sm:gap-4 dark:from-slate-900 dark:via-blue-950 dark:to-cyan-700 dark:text-white">
            <div className="absolute inset-0 opacity-50 dark:opacity-30">
              <div className="absolute -left-10 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-300/40 blur-3xl dark:bg-cyan-400/30" />
              <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-300/35 blur-3xl dark:bg-blue-400/30" />
            </div>
            <div className="relative z-10 flex max-w-[18rem] flex-1 flex-col">
              <p className="pill-badge w-fit dark:!border-white/20 dark:!bg-white/10 dark:!text-white">Limited Deal</p>
              <h3 className="mt-4 line-clamp-2 text-lg font-semibold md:text-2xl">{product.name}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-blue-100 md:text-base">
                Save up to {product.offer}% on this featured pick and bring a little more polish to your setup.
              </p>
              <BtnUnderline className="mt-6" onClick={()=>{}} width="w-14">Shop Now</BtnUnderline>
            </div>
            <div className="relative mt-6 h-40 w-full flex-1 self-end sm:mt-0 sm:h-44 sm:max-w-[12rem] md:h-48 md:max-w-[14rem]">
              <Image
                src={product.imagePath!}
                alt={product.name}
                fill={true}
                style={{ objectFit: "contain" }}
              />
            </div>
          </div>
        </Link>
      </div>
    </MotionReveal>
  );
};

export default OfferCard;
