import { Outlet } from "react-router-dom";
import Navbar from "../compenents/Navbar";
import { SearchProvider } from "../context/SearchContext";
import { WishlistCountProvider } from '../context/WishlistContext'




export default function Root() {
  return (
    <>
        <WishlistCountProvider>
          <SearchProvider>
            <Navbar />
            <Outlet />
          </SearchProvider>
        </WishlistCountProvider>
    </>
  );
}
