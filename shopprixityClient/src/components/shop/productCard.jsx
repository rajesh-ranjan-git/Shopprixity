import React from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import { TbShoppingCartX } from "react-icons/tb";
import { brandOptionsMap, categoryOptionsMap } from "@/config/config";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ShopProductCard = ({
  product,
  handleShopProductDetails,
  handleAddToCart,
}) => {
  return (
    <Card className="mx-auto w-full max-w-sm cursor-pointer">
      <div onClick={() => handleShopProductDetails(product?.id)}>
        <div className="relative">
          <img
            src={product?.image}
            alt={product?.title}
            className="rounded-t-lg w-full h-[300px] object-cover"
          />
          {product?.totalStock === 0 ? (
            <Badge className="top-2 left-2 absolute bg-destructive hover:bg-destructive">
              Out of stock
            </Badge>
          ) : product?.totalStock <= 10 ? (
            <Badge className="top-2 left-2 absolute hover:bg-destructive bg-ring">
              {`Only ${product?.totalStock} items left`}
            </Badge>
          ) : product?.salePrice > 0 ? (
            <Badge className="top-2 left-2 absolute bg-chart-3 hover:bg-destructive">
              Sale
            </Badge>
          ) : null}
        </div>
        <CardContent className="p-4">
          <h2 className="mb-2 font-bold text-card-foreground text-xl">
            {product?.title}
          </h2>
          <div className="flex justify-between items-center mb-2">
            <span className="text-muted-foreground text-sm">
              {categoryOptionsMap[product?.category]}
            </span>
            <span className="text-muted-foreground text-sm">
              {brandOptionsMap[product?.brand]}
            </span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span
              className={`${
                product.salePrice > 0 ? "line-through" : ""
              } text-lg font-semibold text-primary`}
            >
              ₹{product?.price}
            </span>
            {product?.salePrice > 0 ? (
              <span className="font-semibold text-lg text-primary">
                ₹{product?.salePrice}
              </span>
            ) : null}
          </div>
        </CardContent>
      </div>
      <CardFooter className="flex justify-between items-center">
        {product?.totalStock === 0 ? (
          <Button className="opacity-60 w-full cursor-not-allowed">
            <span>Out of stock</span>
            <TbShoppingCartX />
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => handleAddToCart(product?.id, product?.totalStock)}
          >
            <span>Add to cart</span>
            <BiSolidCartAdd />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default ShopProductCard;
