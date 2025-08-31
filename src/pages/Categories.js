import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";
const Categories = () => {
  const { categories, loading, error } = useCategory();
  
  if (loading) {
    return (
      <Layout title={"All Categories"}>
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="text-center">
            <h3>Loading categories...</h3>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title={"All Categories"}>
        <div className="container" style={{ marginTop: "100px" }}>
          <div className="text-center">
            <h3>Error loading categories</h3>
            <p>{error}</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout title={"All Categories"}>
      <div className="container" style={{ marginTop: "100px" }}>
        <div className="row container">
          {categories && categories.length > 0 ? (
            categories.map((c) => (
              <div className="col-md-4 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                <div className="card">
                  <Link to={`/category/${c.slug}`} className="btn cat-btn">
                    {c.name}
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-12 text-center">
              <h3>No categories found</h3>
              <p>Categories will appear here once they are added to the system.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
