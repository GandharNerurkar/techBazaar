import React from "react";
import Image from "next/image";
import BtnUnderline from "@/components/common/custom-button/BtnUnderline";
import Link from "next/link";

const OffBanner = ({product} : {product : any}) => {
  return (
    <Link href={`/${product.category.name}/${product.name}`}>
      <div className="relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-[24px] bg-gradient-to-br from-white via-slate-50 to-blue-100 px-5 py-6 sm:px-8 md:min-h-[478px] md:px-10 md:py-8 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 lg:flex-row lg:items-center">
        <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-cyan-200/40 blur-3xl dark:bg-cyan-400/20" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-500/20" />

        <div className="relative z-10 flex max-w-[28rem] flex-1 flex-col items-start">
          <p className="pill-badge dark:!border-blue-400/30 dark:!bg-blue-400/10 dark:!text-blue-100">
            Featured Deal
          </p>
          <p className="mt-5 text-sm font-medium uppercase tracking-[0.24em] text-slate-500 dark:text-slate-300 md:text-base">
            Get up to {product.offer}% off today
          </p>
          <h3 className="mt-4 text-2xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl md:text-5xl">
            {product.name}
          </h3>
          <p className="mt-4 max-w-[24rem] text-sm leading-7 text-slate-600 dark:text-slate-300 md:text-base">
            Upgrade your everyday setup with a standout pick designed for comfort, performance, and a cleaner desk.
          </p>
          <div className="mt-6 flex items-end gap-3">
            <span className="text-2xl font-semibold text-blue-600 dark:text-blue-300 md:text-3xl">Rs. {product.price}</span>
            <span className="pb-1 text-sm text-slate-400 dark:text-slate-500 line-through">Rs. 50.00</span>
          </div>
          <BtnUnderline className="mt-8" onClick={()=>{}} >Shop Now</BtnUnderline>
        </div>

        <div className="relative z-10 mt-8 h-52 w-full flex-1 self-center sm:h-64 md:h-72 lg:mt-0 lg:h-full lg:min-h-[360px]">
          <Image
            src={product.imagePath!}
            alt={product.name}
            fill={true}
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
    </Link>
  );
};

export default OffBanner;
