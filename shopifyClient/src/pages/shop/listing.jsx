import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShopFilter from "@/components/shop/filter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { sortOptions } from "@/config/config";
import fetchAllShopProductsService from "@/services/shop/fetchAllShopProducts";
import ShopProductCard from "@/components/shop/productCard";
import { staticProductList } from "@/components/common/staticProductList";
import fetchShopProductDetails from "@/services/shop/fetchShopProductDetails";
import ShopProductDetails from "@/components/shop/productDetails";
import { staticProductDetails } from "@/components/common/staticProductDetails";

const ShopListing = () => {
  const dispatch = useDispatch();
  const { shopProductList, shopProductDetails } = useSelector(
    (state) => state.shopProductsReducer
  );
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState(null);
  const [openShopProductDetails, setOpenShopProductDetails] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilters = (getSectionId, getCurrentOptions) => {
    let copyFilters = { ...filters };
    console.log(copyFilters);
    const indexOfCurrentSection =
      Object.keys(copyFilters).indexOf(getSectionId);

    if (indexOfCurrentSection === -1) {
      copyFilters = { ...copyFilters, [getSectionId]: [getCurrentOptions] };
    } else {
      const indexOfCurrentOption =
        copyFilters[getSectionId].indexOf(getCurrentOptions);

      if (indexOfCurrentOption === -1) {
        copyFilters[getSectionId].push(getCurrentOptions);
      } else {
        copyFilters[getSectionId].splice(indexOfCurrentOption, 1);
      }
    }

    setFilters(copyFilters);
    sessionStorage.setItem("filters", JSON.stringify(copyFilters));
  };

  const createSearchParams = (filterParams) => {
    const queryParams = [];

    for (const [key, value] of Object.entries(filterParams)) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }

    return queryParams.join("&");
  };

  const handleShopProductDetails = (getCurrentProductId) => {
    console.log(getCurrentProductId);
    dispatch(fetchShopProductDetails(getCurrentProductId));
    setOpenShopProductDetails(true);
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const createQueryString = createSearchParams(filters);

      console.log("createQueryString : ", createQueryString);

      setSearchParams(new URLSearchParams(createQueryString));
    }
  }, [filters]);

  // Fetch list of products
  useEffect(() => {
    if (filters != null && sort !== null) {
      console.log("sort : ", sort);
      dispatch(
        fetchAllShopProductsService({ filterParams: filters, sortParams: sort })
      );
    }
  }, [dispatch, sort, filters]);

  return (
    <div className="gap-6 grid grid-cols-1 md:grid-cols-[200px_1fr] p-4 md:p-6">
      <ShopFilter filters={filters} handleFilters={handleFilters} />
      <div className="bg-background shadow-sm rounded-lg w-full">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-extrabold text-lg">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {shopProductList
                ? shopProductList?.length
                : staticProductList.length}
              &nbsp; Products
            </span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {shopProductList && shopProductList.length > 0
            ? shopProductList.map((product) => (
                <ShopProductCard
                  product={product}
                  handleShopProductDetails={handleShopProductDetails}
                  key={product.id}
                />
              ))
            : null}
          {/* {staticProductList && staticProductList.length > 0
            ? staticProductList.map((product) => (
                <ShopProductCard
                  product={product}
                  handleShopProductDetails={handleShopProductDetails}
                  key={product.id}
                />
              ))
            : null} */}
        </div>
      </div>
      <ShopProductDetails
        openShopProductDetails={openShopProductDetails}
        setOpenShopProductDetails={setOpenShopProductDetails}
        productDetails={shopProductDetails}
        // productDetails={staticProductDetails}
      />
    </div>
  );
};

export default ShopListing;
