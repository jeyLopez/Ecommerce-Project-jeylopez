import { Outlet } from "react-router-dom"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"
import { Footer } from "../components/Footer"
import React, { useState } from "react";

// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {

    const [cart, setCart] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <ScrollToTop>
            <Navbar cart={cart} setCart={setCart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Outlet context={{ cart, setCart, searchTerm, setSearchTerm }} />
            <Footer />
        </ScrollToTop>
    )
}