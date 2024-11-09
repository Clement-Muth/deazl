import { i18n } from "@lingui/core";
import { Trans, t } from "@lingui/macro";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { Plus, ScanBarcode, Type } from "lucide-react";

interface NewPriceButtonDekstopProps {
  onOpen: () => void;
  onOpenForm: () => void;
  onOpenModal: (type: "with" | "without") => void;
}

export const NewPriceButtonDesktop = ({ onOpen, onOpenForm, onOpenModal }: NewPriceButtonDekstopProps) => (
  <Dropdown placement="bottom">
    <DropdownTrigger>
      <Button startContent={<Plus />} variant="light" radius="full" onPress={onOpen} isIconOnly />
    </DropdownTrigger>
    <DropdownMenu aria-label="Profile Actions" variant="flat">
      <DropdownItem
        key="scan-barcode"
        textValue="Scan barcode"
        data-testid="scan-barcode"
        startContent={<ScanBarcode />}
        onPress={() => {
          onOpenModal("with");
          onOpenForm();
        }}
        description={t(i18n)`Add new price by scanning barcode`}
        shortcut="⌘C"
      >
        <Trans>Scan barcode</Trans>
      </DropdownItem>
      <DropdownItem
        key="type-barcode"
        data-testid="type-barcode"
        textValue="Type barcode"
        startContent={<Type />}
        onPress={() => {
          onOpenModal("without");
          onOpenForm();
        }}
        description={t(i18n)`Add new price by typing barcode`}
        shortcut="⌘N"
      >
        <Trans>Type barcode</Trans>
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
);
