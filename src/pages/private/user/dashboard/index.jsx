import React, { useEffect, useState } from "react";
import ProductCard from "../../../../component/ProductCard";
import { ProductService } from "../../../../network/productService";
function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    const listProduct = await ProductService.allProductList();
    if (listProduct.success && listProduct.code === 200) {
      console.log("list", listProduct);
      setProducts(listProduct?.data?.listProduct);
    } else {
      console.log("error");
    }
  };
  return (
    <div>
      In Dashboard
      <div className="flex flex-wrap justify-center p-4">
        {products.map((product) => (
          <ProductCard key={product?._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
