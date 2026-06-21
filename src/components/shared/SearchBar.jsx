"use client";

import { useState } from "react";
import { ArrowDownWideNarrow, ArrowUpNarrowWide, CreditCardIcon, LogOutIcon, Search, SettingsIcon, UserIcon } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default function SearchBar({
  placeholder = "Search products...",
  className = "",
}) {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    redirect(`/products?search=${value}`)
  };

  const sorting = async (value) => {
    redirect(`/products?sort=${value}`)
  }

  


  return (
    <div className={`flex gap-2 ${className}`}>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">sort by price</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => sorting("lowToHigh")}>

              Low to High
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sorting("highToLow")}>

              High to Low
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <InputGroup className="max-w-xs">
        <InputGroupInput
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
      </InputGroup>

      <Button onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
}