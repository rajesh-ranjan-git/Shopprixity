import React from "react";
import { MdDelete, MdUpdate } from "react-icons/md";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const AddressCard = ({
  addressItem,
  handleUpdateAddress,
  handleDeleteAddress,
  setCurrentSelectedAddress,
  currentSelectAddressId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressItem)
          : null
      }
      className={`${
        currentSelectAddressId === addressItem.id
          ? "border-primary outline-double outline-primary"
          : ""
      } cursor-pointer`}
    >
      <CardContent className="gap-4 grid p-4">
        <Label>Address : {addressItem?.address}</Label>
        <Label>City : {addressItem?.city}</Label>
        <Label>Pin Code : {addressItem?.pincode}</Label>
        <Label>Phone No. : {addressItem?.phone}</Label>
        <Label>Additional Notes : {addressItem?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
        <Button onClick={() => handleUpdateAddress(addressItem)}>
          <span>Update</span>
          <MdUpdate />
        </Button>
        <Button
          onClick={() => handleDeleteAddress(addressItem)}
          className="bg-destructive hover:bg-destructive hover:opacity-80"
        >
          <span>Delete</span>
          <MdDelete />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
