import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/billboard";
import CategoryList from "@/components/category_list";
import Navigation from "@/components/ads";
import ProductList from "@/components/productlist";
import ThisMonthSection from "@/components/this_month";
import Container from "@/components/ui/container";
import Image from "next/image";
import Ads from "@/components/ads";
import { useRouter } from "next/navigation";
import getCategories from "@/actions/get-categories";
import { auth } from "@clerk/nextjs";

const Home = async () => {
  const products = await getProducts({ isFeatured: true });
  const random = Math.floor(Math.random() * products.length);
  const billboards = await getBillboards();
  const categories = await getCategories();

  return (
    <Container>
      <div className="flex-col - w-full">
        <div className="flex items-start justify-between w-full mt-[60px] ">
          <CategoryList data={categories}></CategoryList>
          <Ads slide={billboards}></Ads>
        </div>
        <ThisMonthSection data={products} />
      </div>
    </Container>
  );
};

export default Home;

{
  /* <div className="space-y-10 pb-10">
        <CategoryList data={categories}></CategoryList>
        <Billboard data={billboards[random]} />
        <div className="flex flex-col gap-y-8 px-4">
          <ProductList data={products} title="Featured" />
        </div>
      </div> */
}
