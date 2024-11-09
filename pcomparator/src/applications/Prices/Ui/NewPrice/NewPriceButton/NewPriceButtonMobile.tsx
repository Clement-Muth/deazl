import { Trans } from "@lingui/macro";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Plus, ScanBarcode, Type } from "lucide-react";

interface NewPriceButtonMobileProps {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  onOpenForm: () => void;
  onOpenModal: (type: "with" | "without") => void;
}

export const NewPriceButtonMobile = ({
  isOpen,
  onOpen,
  onOpenChange,
  onOpenForm,
  onOpenModal
}: NewPriceButtonMobileProps) => (
  <>
    <Button startContent={<Plus />} variant="light" radius="full" onPress={onOpen} isIconOnly />
    <Modal placement="bottom" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader />
        <ModalBody aria-label="Profile Actions">
          <Button
            key="scan-barcode"
            data-testid="scan-barcode"
            startContent={<ScanBarcode />}
            size="lg"
            onPress={() => {
              onOpenModal("with");
              onOpenForm();
            }}
          >
            <Trans>Scan barcode</Trans>
          </Button>
          <Button
            key="type-barcode"
            data-testid="type-barcode"
            startContent={<Type />}
            size="lg"
            onPress={() => {
              onOpenModal("without");
              onOpenForm();
            }}
          >
            <Trans>Type barcode</Trans>
          </Button>
        </ModalBody>
        <ModalFooter />
      </ModalContent>
    </Modal>
  </>
);
