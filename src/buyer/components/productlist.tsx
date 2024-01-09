import { Product } from "@/type";
import ProductCard from "./ui/product-card";
interface ProductListProps {
  title: string;
  data: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, data }) => {
  return (
    <div className="space-y-4 mx-[40px] mb-10">
      <h3 className="font-semibold text-xl">{title}</h3>
      <div className="flex justify-between">
        {data.map((item) => (
          <ProductCard data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
