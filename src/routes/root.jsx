import { Outlet } from "react-router-dom";
import  Navbar  from "../compenents/Navbar"

export default function Root() {
  return (
    <>
      <Navbar/>
      <Outlet />
    </>
  );
}
