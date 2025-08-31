import { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories
  const getCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get("/api/v1/category/get-category");

      if (data?.success) {
        // ✅ your backend sends "category" array, keep it safe
        setCategories(data?.category || []);
      } else {
        setError(data?.message || "Failed to fetch categories");
        setCategories([]);
      }
    } catch (err) {
      console.error("Category fetch error:", err);
      setError("Failed to load categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return { categories, loading, error };
}
