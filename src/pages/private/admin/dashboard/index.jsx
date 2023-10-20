import React, { useEffect, useState } from "react";
import ProductCard from "../../../../component/ProductCard";
import Loader from "../../../../component/Loader";
import DataTable from "../../../../component/DataTable";
import { ProductService } from "../../../../network/productService";
function AdminDashboard() {
  const [allRecord, setAllRecord] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      id: "no",
      label: "Sr No",
    },
    {
      id: "customerName",
      label: "Customer Name",
    },
    {
      id: "customerEmail",
      label: "Customer Email",
    },
    {
      id: "productName",
      label: "Product Name",
    },
    {
      id: "productPrice",
      label: "Product Price",
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
    },
    {
      id: "paymentStatus",
      label: "Payment Status",
    },
  ];
  useEffect(() => {
    getAllTransaction();
  }, []);

  const getAllTransaction = async () => {
    setLoading(true);
    let getTransaction = await ProductService.allTransaction();
    if (getTransaction.code === 200 && getTransaction.success) {
      setAllRecord(getTransaction?.data?.listTransaction);
      setLoading(false);
    } else {
      setAllRecord([]);
      setLoading(false);
    }
  };

  function createData(
    no,
    customerName,
    customerEmail,
    productName,
    productPrice,
    paymentMethod,
    paymentStatus
  ) {
    return {
      no,
      customerName,
      customerEmail,
      productName,
      productPrice,
      paymentMethod,
      paymentStatus,
    };
  }

  let recordData = [];

  // eslint-disable-next-line no-unused-vars
  let creatRow =
    allRecord &&
    allRecord.length > 0 &&
    allRecord.map((list, i) => {
      return recordData.push(
        createData(
          i + 1,
          list?.user?.full_name,
          list?.user?.email,
          list?.product?.productName,
          list?.product?.productPrice,
          list?.paymentType,
          list?.paymentStatus
        )
      );
    });

  return (
    <div>
      {loading && <Loader />}
      <h2 className="p-7">Admin Dashboard</h2>
      <div className="p-7">
        <DataTable data={recordData} columns={columns} pageSize={5} />
      </div>
    </div>
  );
}

export default AdminDashboard;
