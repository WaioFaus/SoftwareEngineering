
import CategoryList from "@/components/category_list";
import ThisMonthSection from "@/components/this_month";
import Container from "@/components/ui/container";
import Ads from "@/components/ads";

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
