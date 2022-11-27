import { useCallback, useEffect, useMemo, useState } from "react";

const usePagination = (data: Object[], itemsPage: number = 10) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showItemsPage, setShowItemsPage] = useState<number>(itemsPage)
  const pageNumbers = [];

  const lastPageData = useMemo(
    () => showItemsPage * currentPage,
    [currentPage, showItemsPage]
  );
  const firstPageData = useMemo(
    () => lastPageData - showItemsPage,
    [showItemsPage, lastPageData]
  );

  const [filteredData, setFilteredData] = useState<Object[]>(data || []);
  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const [sliceData, setSliceData] = useState<Object[]>(
    [...filteredData]?.slice(firstPageData, lastPageData)
  );

  const [searching, setSearching] = useState<boolean>(false);

  useEffect(() => {
    setSliceData([...filteredData]?.slice(firstPageData, lastPageData));
    if (searching) {
      setCurrentPage(1);
      setSearching(false);
    }
  }, [filteredData, firstPageData, lastPageData, searching]);

  const pages = useMemo(
    () => Math.ceil(filteredData?.length / showItemsPage),
    [filteredData?.length, showItemsPage]
  );
  let otherLeft = false;
  let otherRight = false;
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => prev + 1);
    if (currentPage === pages) setCurrentPage(pages);
  }, [currentPage, pages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => prev - 1);
    if (currentPage === 1) setCurrentPage(1);
  }, [currentPage]);

  for (let i = 1; i < pages + 1; i++) {
    if (i === currentPage) {
      pageNumbers.push({ id: i, current: true, other: false });
    } else if (
      i < 2 ||
      i > pages - 1 ||
      i === currentPage - 1 ||
      i === currentPage + 1
    ) {
      pageNumbers.push({ id: i, current: false, other: false });
    } else if (i > 1 && i < currentPage && !otherLeft) {
      pageNumbers.push({ id: i, current: false, other: true });
      otherLeft = true;
    } else if (i < pages && i > currentPage && !otherRight) {
      pageNumbers.push({ id: i, current: false, other: true });
      otherRight = true;
    }
  }
  return {
    sliceData,
    paginate,
    nextPage,
    prevPage,
    pageNumbers,
    currentPage,
    pages,
    setFilteredData,
    setSearching,
    filteredData,
    setShowItemsPage,
    showItemsPage,
    lastPageData,
    firstPageData
  };
};
export default usePagination;
