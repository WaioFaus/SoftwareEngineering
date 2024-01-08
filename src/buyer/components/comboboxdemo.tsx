"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Product } from "@/type";
import { useRouter } from "next/navigation";

const ComboboxDemo = ({products} : {products? : Product[]}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const router = useRouter()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? products?.find((product) => product.name === value)?.name
            : "Search for a product"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search product..." />
          <CommandEmpty>No product found</CommandEmpty>
          <CommandGroup>
            {products?.map((product) => (
              <CommandItem
                key={product.id}
                value={product.name}
                onSelect={() => {
                  // Use product.name instead of an empty string
                  setValue(product.name);
                  setOpen(false);
                  router.push(`/products/${product.id}`);
                }}
              >
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxDemo;