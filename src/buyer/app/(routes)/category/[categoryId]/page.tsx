import getCategories from "@/actions/get-categories";
import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/billboard";
import Container from "@/components/ui/container";
import Filter from "./components/filter";
import ProductCard from "@/components/ui/product-card";

interface CategoryPageProps {
  params: {
    categoryId: string;
  };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const Category: React.FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);
  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard}></Billboard>
        <div className="px-4 pb-24">
          <div className="grid grid-cols-5 gap-x-8">
            <div>
              <Filter valueKey="sizeId" name="Sizes" data={sizes}></Filter>
              <Filter valueKey="colorId" name="Colors" data={colors}></Filter>
            </div>
            <div className="  col-span-4 ">
              <div className="grid grid-cols-1 gap-4">
                {products.map((item) => (
                  <ProductCard data={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Category;
