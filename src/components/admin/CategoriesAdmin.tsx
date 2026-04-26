import React from "react";
import CategoryCardAdmin from "./CategoryCardAdmin";
import AddCategoryCard from "./AddCategoryCard";
import { category } from "@prisma/client";
import MotionReveal from "../common/motion/MotionReveal";

interface IAdminProps {
  categories: category[]
}

const CategoriesAdmin = ({categories} : IAdminProps) => {
  return (
    <MotionReveal className="md:mt-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="pill-badge mb-4">Admin</p>
          <h3 className="section-title">All Categories</h3>
          <p className="section-subtitle mt-2">Manage inventory groups from a more modern dashboard surface.</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-8 my-5">
        {
          categories.map((category) => {
            return <CategoryCardAdmin key={category.id} category={category} />
          })
        }
        <AddCategoryCard />
      </div>
    </MotionReveal>
  );
};

export default CategoriesAdmin;
