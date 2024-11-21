import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">
          <Outlet /> {/* This is where the nested routes (e.g., HomePage) will render */}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;