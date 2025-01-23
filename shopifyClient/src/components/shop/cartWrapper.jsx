import React from "react";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import ShopCartContents from "./cartContents";

const ShopCartWrapper = ({ cartItems }) => {
  const totalCartAmount = cartItems.reduce(
    (sum, item) =>
      (sum +=
        (item?.product?.salePrice > 0
          ? item?.product?.salePrice
          : item?.product?.price) * item?.quantity),
    0
  );

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className="space-y-4 mt-8">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ShopCartContents cartItem={item} key={item?.id} />
          ))
        ) : (
          <p className="text-2xl text-bold text-center">
            Nothing in your cart!
          </p>
        )}
      </div>
      <div className="space-y-4 mt-8">
        <div className="flex justify-between">
          <span className="font-bold">Total Amount</span>
          <span className="font-bold">₹{totalCartAmount}</span>
        </div>
      </div>
      <SheetDescription></SheetDescription>
      <Button className="mt-6 w-full">Checkout</Button>
    </SheetContent>
  );
};

export default ShopCartWrapper;
