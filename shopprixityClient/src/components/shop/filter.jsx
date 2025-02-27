import React, { Fragment } from "react";
import { filterOptions } from "@/config/config";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const ShopFilter = ({ filters, handleFilters }) => {
  return (
    <div className="bg-background shadow-sm rounded-lg">
      <div className="p-4 border-b">
        <h2 className="font-extrabold text-lg">Filters</h2>
      </div>
      <div className="space-y-4 p-4">
        {Object.keys(filterOptions).map((keyItem) => (
          <Fragment key={keyItem}>
            <div>
              <h3 className="font-bold text-base">{keyItem}</h3>
              <div className="gap-2 grid mt-2">
                {filterOptions[keyItem].map((option) => (
                  <Label
                    className="flex items-center gap-2 font-medium"
                    key={option.id}
                  >
                    <Checkbox
                      checked={
                        filters &&
                        Object.keys(filters).length > 0 &&
                        filters[keyItem] &&
                        filters[keyItem].indexOf(option.id) > -1
                      }
                      onCheckedChange={() => handleFilters(keyItem, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ShopFilter;
