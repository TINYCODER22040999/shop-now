import { useState, useContext, createContext, useCallback } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [searchData, setSearchData] = useState({
    keyword: "",
    results: [],
  });

  const setKeyword = useCallback((keyword) => {
    setSearchData(prev => ({ ...prev, keyword }));
  }, []);

  const setResults = useCallback((results) => {
    setSearchData(prev => ({ ...prev, results }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchData({ keyword: "", results: [] });
  }, []);

  const value = {
    ...searchData,
    setKeyword,
    setResults,
    clearSearch
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };
