import { Navigate } from "react-router-dom";
import { getUser } from "../utils/storage";
import Navbar from "../components/Navbar";

export default function Control(proprs: { item: JSX.Element }) {
  const user = getUser();

  return user === null ? (
    <Navigate to={"/"} replace></Navigate>
  ) : (
    <>
      <Navbar user={user}/>
      <div className="row">
        <div className="col-sm-12">{proprs.item}</div>
      </div>
    </>
  );
}
