import { useEffect, useState } from "react";
import { searchProducts } from "../utils/Api";
import { useSearchParams } from "react-router-dom";
import { IProducts } from "../models/IProducts";
import ProductItem from "../components/ProductItem";
import loadGif from "../assets/loading.gif";

export default function Search() {
  let [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<IProducts>();
  const skip = 0;
  const [pages, setPages] = useState<number[]>([]);
  const limit = 8;
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setcurrentPage] = useState<number>(1);

  useEffect(() => {
    fncSearch(skip);
  }, [searchParams]);
  // url de searchParams değişirse tetiklenecek

  function fncSearch(skipParams: number) {
    searchProducts(searchParams.get("query") as string, skipParams, limit).then((resp) => {
      setLoading(false);
      const respdata = resp.data;
      setProducts(respdata);
      setcurrentPage(skipParams / limit + 1);
      let count: number = Math.ceil(respdata.total / limit);
      let countArr: number[] = [];
      for (let index = 0; index < count; index++) {
        countArr.push(index);
      }
      setPages(countArr);
    });
  }

  return (
    <>
      <h2>Search</h2>
      <div className="row">
        {loading && <img src={loadGif}></img>}
        {products && <div>Count: {products.total}</div>}
        {products &&
          products.products.map((prod, index) => {
            return <ProductItem key={index} image={prod.thumbnail} title={prod.title} descr={prod.description} price={prod.price} id={prod.id} />;
          })}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li
              onClick={() => {
                if (currentPage > 1) {
                  fncSearch((currentPage - 2) * limit);
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
                <li onClick={() => fncSearch(page * limit)} key={index} className={currentPage - 1 == page ? "page-item disabled" : "page-item"}>
                  <a className="page-link" role="button">
                    {page + 1}
                  </a>
                </li>
              );
            })}
            <li
              onClick={() => {
                if (currentPage * limit < products?.total!) {
                  fncSearch(currentPage * limit);
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
      </div>
    </>
  );
}
