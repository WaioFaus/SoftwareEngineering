import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Gallery from "@/components/gallery";
import Info from "@/components/info";
import ProductList from "@/components/productlist";
import Container from "@/components/ui/container";

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const relatedProducts = await getProducts({
    categoryId: product.category.id,
  });
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 ">
          <div className="grid-cols-2 items-start gap-x-8 grid">
            <Gallery images={product.images}></Gallery>
            <div className=" px-4 ">
              <Info data={product}></Info>
            </div>
          </div>
        </div>
        <hr className="my-10" />
        <ProductList
          title="Related prodducts"
          data={relatedProducts}
        ></ProductList>
      </Container>
    </div>
  );
};

export default ProductPage;
