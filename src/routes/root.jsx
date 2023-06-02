import { Outlet } from "react-router-dom";
import Navbar from "../compenents/Navbar"
import { WishlistProvider } from '../contexts/WishListContext';


export default function Root() {
  return (
    <>
      <Navbar />
      <WishlistProvider>
        <Outlet />
      </WishlistProvider>
    </>
  );
}
