import { Button, useDisclosure } from "@nextui-org/react";
import { ScanBarcode } from "lucide-react";
import { useState, useTransition } from "react";
import { search } from "~/applications/Searchbar/Api/search";
import { searchByBarcode } from "~/applications/Searchbar/Api/searchByBarcode";
import { BarcodeScannerModal } from "~/applications/Searchbar/Ui/SearchBarcode/BarcodeScannerModal";
import { SearchResultModal } from "~/applications/Searchbar/Ui/SearchResult/SearchResultModal";

interface SearchBarcodeProps {
  onNewProduct: (productName: string) => void;
}

export const SearchBarcode = ({ onNewProduct }: SearchBarcodeProps) => {
  const [pending, startTransition] = useTransition();
  const { onOpen, onClose, isOpen, onOpenChange } = useDisclosure();
  const [searchResult, setSearchResult] = useState<Awaited<ReturnType<typeof search>> | null>(null);

  return (
    <>
      {!searchResult ? (
        <BarcodeScannerModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onBarcodeDetected={(barcode) => {
            !pending &&
              startTransition(async () => {
                const { name } = await searchByBarcode({ barcode: barcode.barcode });
                const formData = new FormData();

                formData.append("search", name);
                const results = await search(null, formData);

                if (!results.prices) {
                  onNewProduct(results.search);
                  onClose();
                } else setSearchResult(results);
              });
          }}
        />
      ) : null}
      <Button
        startContent={<ScanBarcode />}
        onPress={onOpen}
        radius="full"
        variant="faded"
        className="p-7 w-18 h-18 -mt-8 border-none shadow-medium"
        isIconOnly
      />
      {searchResult && (
        <SearchResultModal
          isOpen={isOpen}
          onClose={() => {
            onClose();
            setSearchResult(null);
          }}
          onOpenChange={onOpenChange}
          prices={searchResult?.prices as any}
          search={searchResult?.search}
        />
      )}
    </>
  );
};
