import { Trans } from "@lingui/macro";
import {
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader
} from "@nextui-org/react";
import { Info } from "lucide-react";
import { useState } from "react";
import { Location } from "~/applications/Prices/Ui/NewPrice/FormSteps/Step4/Location";
import { Stepper } from "~/components/Stepper/Stepper";

interface NewQuickPriceProps {
  isOpen: boolean;
  onOpenChange: () => void;
  productName: string;
}

export const NewQuickPrice = ({ isOpen, onOpenChange, productName }: NewQuickPriceProps) => {
  const [step, setStep] = useState(1);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className="mt-4">
          <Stepper steps={[{ label: "Price" }, { label: "Location" }]} currentStep={step} />
        </ModalHeader>
        {step === 1 ? (
          <form onSubmit={() => setStep(2)}>
            <ModalBody>
              <Card>
                <CardBody className="flex !flex-row gap-6 dark:bg-yellow-200/[0.06]">
                  <Info color="#f4e28d" size="22px" />
                  <div className="flex-1">
                    <p className="text-small">
                      <Trans>Product "{productName}" was not found but added to your account.</Trans>
                    </p>
                    <p className="text-small mt-2">Add a price to validate it.</p>
                  </div>
                </CardBody>
              </Card>
              <Input
                type="text"
                name="price"
                placeholder="2.99"
                label={<Trans>Price</Trans>}
                labelPlacement="outside"
                size="lg"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Next
              </Button>
            </ModalFooter>
          </form>
        ) : (
          <Location
            onPrevious={() => setStep(1)}
            onNextStep={async (data) => {
              console.log(data);
            }}
          />
        )}
      </ModalContent>
    </Modal>
  );
};
