import { NavLink, useNavigate } from "react-router-dom";
import { IUser } from "../models/IUser";
import { SyntheticEvent, useState } from "react";
import CartModal from "./CartModal";

export default function Navbar(props: { user?: IUser }) {
  const navigate = useNavigate();
  const [searchVal, setsearchVal] = useState("");

  function logout() {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  }

  function search(evt: SyntheticEvent) {
    evt.preventDefault();
    navigate("/search?query=" + searchVal);
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to={"/dashboard"} className="nav-link">
                Dashboard
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/profile"} className="nav-link">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <CartModal />
            </li>
            <li className="nav-item">
              <a onClick={logout} className="nav-link" role="button">
                Logout
              </a>
            </li>
            <li className="nav-item">
              {props.user && (
                <a className="nav-link disabled" href="#">
                  {props.user.firstName + " " + props.user.lastName}
                </a>
              )}
            </li>
          </ul>
          <form onSubmit={search} className="d-flex" role="search">
            <input
              onChange={(evt) => {
                setsearchVal(evt.target.value);
              }}
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
    </>
  );
}
