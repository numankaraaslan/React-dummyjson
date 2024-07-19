import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function ProductItem(props: { image: string; title: string; descr: string; price: number; id: number }) {
  //const nav = useNavigate();
  //function sdf() {
  //nav("/productDetail/" + props.id, { state: props });
  //}
  // <div className="btn btn-primary" onClick={sdf} role="button">detail</div>

  return (
    <div className="col-sm-3">
      <div className="card m-1">
        <img src={props.image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">{props.descr}</p>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <NavLink to={"/productDetail/" + props.id} className="btn btn-primary">
              Detail
            </NavLink>
            <label className="btn btn-warning">{props.price}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
