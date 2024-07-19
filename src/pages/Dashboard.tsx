import { useEffect, useState } from "react";
import { allProducts } from "../utils/Api";
import { IProducts, Product } from "../models/IProducts";
import ProductItem from "../components/ProductItem";
import loadGif from "../assets/loading.gif";

export default function Dashboard() {
  // const navigate = useNavigate();
  // useEffect(() => {
  //   const user = getUser();
  //   if(user == null)
  //     {
  //       navigate("/");
  //     }
  // }, [])

  const [products, setProducts] = useState<IProducts>();
  const [loading, setLoading] = useState<boolean>(true);
  const skip = 0;
  const limit = 16;
  const [currentPage, setcurrentPage] = useState<number>(1);
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    fncDashboard(skip);
  }, []);

  function fncDashboard(skipParams: number) {
    allProducts(skipParams, limit).then((resp) => {
      setProducts(resp.data);
      setLoading(false);
      setcurrentPage(skipParams / limit + 1);
      let count: number = Math.ceil(resp.data.total / limit);
      let countArr: number[] = [];
      for (let index = 0; index < count; index++) {
        countArr.push(index);
      }
      setPages(countArr);
    });
  }

  return (
    <>
      <h2>Dashboard</h2>
      <div className="row">
        {loading && <img src={loadGif}></img>}
        {products && <div>Count: {products.total}</div>}
        {products &&
          products.products.map((prod, index) => {
            return <ProductItem key={index} image={prod.thumbnail} title={prod.title} descr={prod.description} price={prod.price} id={prod.id} />;
          })}
      </div>
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end">
          <li
            onClick={() => {
              if (currentPage > 1) {
                fncDashboard((currentPage - 2) * limit);
              }
            }}
            className={currentPage == 1 ? "page-item disabled" : "page-item"}
          >
            <a className="page-link" role="button">
              Previous
            </a>
          </li>
          {pages.map((page, index) => {
            return (
              <li onClick={() => fncDashboard(page * limit)} key={index} className={currentPage - 1 == page ? "page-item disabled" : "page-item"}>
                <a className="page-link" role="button">
                  {page + 1}
                </a>
              </li>
            );
          })}
          <li
            onClick={() => {
              if (currentPage * limit < products?.total!) {
                fncDashboard(currentPage * limit);
              }
            }}
            className={currentPage >= products?.total! / 8 ? "page-item disabled" : "page-item"}
          >
            <a className="page-link" role="button">
              Next
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
