"use client";

import { Trans } from "@lingui/macro";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import { toast } from "react-toastify";
import type { Barcode } from "~/applications/Prices/Domain/ValueObjects/Barcode";
import { BarcodeScannerModal } from "~/applications/Prices/Ui/NewPrice/BarcodeScanner/BarcodeScannerModal";
import { NewPriceModal } from "~/applications/Prices/Ui/NewPrice/NewPiceModal";
import { NewPriceButtonDesktop } from "~/applications/Prices/Ui/NewPrice/NewPriceButton/NewPriceButtonDesktop";
import { NewPriceButtonMobile } from "~/applications/Prices/Ui/NewPrice/NewPriceButton/NewPriceButtonMobile";
import useDevice from "~/hooks/useDevice";

export const NewPriceButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpenForm,
    onOpen: onOpenForm,
    onOpenChange: onOpenChangeForm,
    onClose: onCloseForm
  } = useDisclosure();
  const [modal, setModal] = useState<"with" | "without" | undefined>(undefined);
  const [barcode, setBarcode] = useState<Barcode | undefined>(undefined);
  const notify = (productName: string) =>
    toast(<Trans>Price for {productName} added!</Trans>, {
      type: "success"
    });
  const device = useDevice();

  return (
    <>
      {modal === "with" ? (
        <BarcodeScannerModal
          isOpen={isOpenForm}
          onOpenChange={onOpenChangeForm}
          onBarcodeDetected={(detectedBarcode) => {
            if (!barcode) {
              setBarcode(detectedBarcode);
              setModal("without");
            }
          }}
        />
      ) : null}
      {modal === "without" ? (
        <NewPriceModal
          isOpen={isOpenForm}
          onOpenChange={onOpenChangeForm}
          onSuccessfull={(productName) => {
            notify(productName);
            onCloseForm();
          }}
          barcode={barcode}
        />
      ) : null}
      {device === "desktop" ? (
        <NewPriceButtonDesktop onOpen={onOpen} onOpenForm={onOpenForm} onOpenModal={setModal} />
      ) : (
        <NewPriceButtonMobile
          isOpen={isOpen}
          onOpen={onOpen}
          onOpenChange={onOpenChange}
          onOpenForm={onOpenForm}
          onOpenModal={setModal}
        />
      )}
    </>
  );
};
