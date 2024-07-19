import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../utils/Api";
import { Product } from "../models/IProducts";
import loadingGif from "../assets/loading.gif";
import { CartContext } from "../utils/CartContext";
import { ICartitem } from "../models/ICartitem";

export default function ProductDetail() {
  const [product, setproduct] = useState<Product>();
  const [bigImage, setBigImage] = useState<string>("");
  const params = useParams();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    const id: string = params.pid!;
    getProduct(id).then((resp) => {
      setproduct(resp.data);
      setBigImage(resp.data.images[0]);
    });
  }, []);

  function addToCart(product: Product) {
    const newCartItem : ICartitem = {id: product.id, description: product.description, title: product.title, thumbnail: product.thumbnail, amount:1};
    cartContext.addToCartFunctionOfContext(newCartItem);
  }

  return (
    <>
      {!product && <img src={loadingGif} width={100} height={100}></img>}
      {product && (
        <div className="row">
          <div className="col-sm-6">
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            {product.tags.map((tag, index) => {
              return (
                <span key={index} className="badge text-bg-secondary me-2">
                  {tag}
                </span>
              );
            })}
            <p>Stock: {product.stock}</p>
            <p>Shipping: {product.shippingInformation}</p>
            <p>Return policy: {product.returnPolicy}</p>
            <p>Rating: {product.rating}</p>
            <p>Category: {product.category}</p>
            <p>Price: {product.price}</p>
            <button type="button" className="btn btn-primary" onClick={() => {
              addToCart(product)
            }}>Add to cart</button>
          </div>
          <div className="col-sm-6">
            <div>
              {product.images.map((img, index) => {
                return (
                  <img
                    key={index}
                    role="button"
                    src={img}
                    alt="..."
                    width={100}
                    className="img-thumbnail me-2"
                    onClick={() => {
                      setBigImage(img);
                    }}
                  />
                );
              })}
              <hr/>
              <img src={bigImage} alt="..." width={200} className="img-fluid" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
