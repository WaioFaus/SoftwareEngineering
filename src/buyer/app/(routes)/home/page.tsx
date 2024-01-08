import getBillboards from "@/actions/get-billboards";
import getProducts from "@/actions/get-products";
import CategoryList from "@/components/category_list";

import Container from "@/components/ui/container";
import Ads from "@/components/ads";
import getCategories from "@/actions/get-categories";
import FeaturedSection from "@/components/featured-section";
import BestByCategories from "@/components/bestByCategories-section";
import RecentlyAddedSection from "@/components/recentlyAdded-section";

const Home = async () => {
  const products = await getProducts({
    isFeatured: true,
  });

  const billboards = await getBillboards();
  const categories = await getCategories();
  return (
    <Container>
      <div className="flex-col w-full items-center">
        <div className="flex w-full mt-[60px]  justify-center ">
          <CategoryList data={categories}></CategoryList>
          <Ads slide={billboards}></Ads>
        </div>
         <FeaturedSection data={products} />
        <BestByCategories data={products} />
        <RecentlyAddedSection data={products} /> 
      </div>
    </Container>
  );
};

export default Home;