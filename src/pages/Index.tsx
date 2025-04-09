
import React from "react";
import ProductGrid from "@/components/ProductGrid";
import { products } from "@/data/products";

const Index = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Management System</h1>
        <p className="text-gray-600">Browse products and add them to your cart</p>
      </header>
      
      <main>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Available Products</h2>
          <ProductGrid products={products} />
        </section>
      </main>
    </div>
  );
};

export default Index;
