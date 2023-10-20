import React, { useEffect, useState } from "react";
import ProductCard from "../../../../component/ProductCard";
import { ProductService } from "../../../../network/productService";
import Loader from "../../../../component/Loader";
function Dashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    setLoading(true);
    const listProduct = await ProductService.allProductList();
    if (listProduct.success && listProduct.code === 200) {
      setProducts(listProduct?.data?.listProduct);
      setLoading(false);
    } else {
      setLoading(false);
      console.log("error");
    }
  };
  return (
    <div>
      {loading && <Loader />}
      <div className="flex flex-wrap justify-center p-4">
        {products.map((product) => (
          <ProductCard
            key={product?._id}
            product={product}
            setLoading={setLoading}
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
