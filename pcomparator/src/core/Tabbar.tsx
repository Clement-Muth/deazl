"use client";

import { useDisclosure } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useState } from "react";
const NewQuickPrice = dynamic(() =>
  import("~/applications/Prices/Ui/NewQuickPrice/NewQuickPrice").then((mod) => mod.NewQuickPrice)
);
import { SearchBarcode } from "~/applications/Searchbar/Ui/SearchBarcode/SearchBarcode";
import { Tabbar as TabbarComponent } from "~/components/Tabbar/Tabbar";

export const Tabbar = () => {
  const [productName, setProductName] = useState<string | null>(null);
  const { isOpen, onOpenChange, onOpen } = useDisclosure();

  return (
    <>
      <TabbarComponent
        mainButton={
          <SearchBarcode
            onNewProduct={(productName) => {
              setProductName(productName);
              onOpen();
            }}
          />
        }
      />
      {isOpen && productName ? (
        <NewQuickPrice isOpen={isOpen} onOpenChange={onOpenChange} productName={productName} />
      ) : null}
    </>
  );
};
