import React from "react";
import CategoryCard from "../card/CategoryCard";
import { category } from "@prisma/client";
import MotionReveal from "@/components/common/motion/MotionReveal";

interface Props {
  categories: category[];
}

const ExploreCategory = ({categories} : Props) => {
  return (
    <MotionReveal className="mt-12 mb-16">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="pill-badge mb-4">Discover</p>
          <h3 className="section-title">Explore Categories</h3>
          <p className="section-subtitle mt-2">Browse curated tech aisles with a cleaner grid and stronger product focus.</p>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 my-5">
        {
          categories?.map((category, index) => {
            return <CategoryCard key={index} category={category} />
          })
        }
      </div>
    </MotionReveal>
  );
};

export default ExploreCategory;
