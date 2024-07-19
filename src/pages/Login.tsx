import { FormEvent, useState } from "react";
import { NavLink, NavigateFunction, useNavigate } from "react-router-dom";
import { login } from "../utils/Api";
import { IUser } from "../models/IUser";
import { setUser } from "../utils/storage";

export default function Login() {
  const navigate: NavigateFunction = useNavigate();

  const [userName, setUserName] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");
  const [formError, setFormError] = useState<string>("");

  const loginUser = (evt: FormEvent) => {
    evt.preventDefault();
    setFormError("");
    if (userName === "" || password === "") {
      setFormError("Enter username and password");
    } else {
      login(userName, password).then(res => {
        const dt : IUser = res.data;
        setUser(dt);
        navigate('/dashboard', {replace:true});
      }).catch(err => {
        console.log(err.message);
      })
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-4 col-xl-4 col-xxl-4"></div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-4 col-xl-4 col-xxl-4">
          <h2>User login</h2>
          {formError && formError !== "" && (
            <div className="alert alert-warning alert-dismissible fade show" role="alert">
              <strong>Error!</strong> {formError}
              <button onClick={() => setFormError("")} type="button" className="btn-close" aria-label="Close"></button>
            </div>
          )}
          <form onSubmit={loginUser}>
            <div className="mb-3">
              <input onChange={(evt) => setUserName(evt.target.value)} defaultValue={userName} className="form-control" placeholder="emilys" required />
            </div>
            <div className="mb-3">
              <input onChange={(evt) => setPassword(evt.target.value)} type="password" defaultValue={password} className="form-control" placeholder="emilyspass" required />
            </div>
            <div>
              <button type="submit" className="btn btn-success">
                Login
              </button>
              <NavLink to={"/register"} className="btn btn-danger mx-1">
                Register
              </NavLink>
            </div>
          </form>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-4 col-xl-4 col-xxl-4"></div>
      </div>
    </>
  );
}
