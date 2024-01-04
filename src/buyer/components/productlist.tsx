import { Product } from "@/type";
import ProductCard from "./ui/product-card";
interface ProductListProps {
  title: string;
  data: Product[];
}

const ProductList: React.FC<ProductListProps> = ({ title, data }) => {
  return (
    <div className="space-y-4">
      <h3>{title}</h3>
      <div className="grid grid-cols-4 gap-4">
        {data.map((item) => (
          <ProductCard data={item} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
