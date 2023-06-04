import { Outlet } from "react-router-dom";
import Navbar from "../compenents/Navbar";
import { SearchProvider } from "../context/SearchContext";




export default function Root() {
  return (
    <>
        <SearchProvider>
          <Navbar />
          <Outlet />
        </SearchProvider>
    </>
  );
}
