import { t } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { Modal, ModalContent, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { createPrice } from "~/applications/Prices/Api/createPrice";
import { getProduct } from "~/applications/Prices/Api/getProduct";
import type { Barcode } from "~/applications/Prices/Domain/ValueObjects/Barcode";
import { Currency } from "~/applications/Prices/Domain/ValueObjects/Currency";
import { FormSteps } from "~/applications/Prices/Ui/NewPrice/FormSteps/FormSteps";
import { Stepper } from "~/components/Stepper/Stepper";

interface NewProductModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  barcode: Barcode | undefined;
  onSuccessfull: (productName: string) => void;
}

export const NewPriceModal = ({ isOpen, onOpenChange, onSuccessfull }: NewProductModalProps) => {
  const { i18n } = useLingui();
  const [step, setStep] = useState<number>(1);
  const [productData, setProductData] = useState<{ price: number; barcode: string } | {}>({});

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl">
        <ModalContent>
          <ModalHeader className="mt-4">
            <Stepper steps={[{ label: t(i18n)`Barcode` }, { label: t(i18n)`Price` }]} currentStep={step} />
          </ModalHeader>
          <FormSteps
            step={step}
            onNextStep={async (data) => {
              setProductData((product) => ({ ...product, ...data }));
              setStep((currentStep) => currentStep + 1);
            }}
            onLastStep={async (data) => {
              const finalProductData = { ...productData, ...data };

              const product = await createPrice({
                amount: finalProductData.price,
                barcode: finalProductData.barcode,
                currency: Currency.Euro,
                location: "4 Rue du Dôme, 67000 Strasbourg"
              });
              onSuccessfull(product.name);
            }}
            onPrevious={() => setStep((currentStep) => currentStep - 1)}
            onCheckBarcode={(barcode) => getProduct({ barcode: { barcode: barcode, format: "test" } })}
          />
        </ModalContent>
      </Modal>
    </>
  );
};