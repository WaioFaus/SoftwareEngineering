import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import CategoryList from "@/components/category_list";
import Navigation from "@/components/ads";
import ProductList from "@/components/productlist";

import Container from "@/components/ui/container";
import Image from "next/image";
import Ads from "@/components/ads";
import { useRouter } from "next/navigation";
import getCategories from "@/actions/get-categories";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import FeaturedSection from "@/components/featured-section";
import BestByCategories from "@/components/bestByCategories-section";
import { getTwoProductsPerCategory } from "@/actions/get-by-category";

const Home = async () => {
  const products = await getProducts({
    isFeatured: true,
  });

  const billboards = await getBillboards();
  const categories = await getCategories();
  return (
    <Container>
      <div className="flex-col - w-full">
        <div className="flex items-start justify-between w-full mt-[60px] ">
          <CategoryList data={categories}></CategoryList>
          <Ads slide={billboards}></Ads>
        </div>
        <FeaturedSection data={products} />
        <BestByCategories data={products} />
      </div>
    </Container>
  );
};

export default Home;
