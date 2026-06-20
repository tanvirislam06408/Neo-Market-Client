"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Filter, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchSellerProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "all");
  const [status, setStatus] = useState(searchParams.get("status") || "all");

  const hasActiveFilters =
    search !== "" || category !== "all" || status !== "all";

  // Helper: push current filters to the URL
  const updateParams = useCallback(
    (next) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(next).forEach(([key, val]) => {
        if (val && val !== "all") {
          params.set(key, val);
        } else {
          params.delete(key);
        }
      });

      // reset pagination whenever filters change
      params.delete("page");

      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams]
  );

  // Debounce the search input only
  useEffect(() => {
    const timeout = setTimeout(() => {
      console.log("search value:", search);
      updateParams({ search, category, status });
    }, 400);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleCategoryChange = (val) => {
    console.log("category value:", val);
    setCategory(val);
    updateParams({ search, category: val, status });
  };

  const handleStatusChange = (val) => {
    console.log("status value:", val);
    setStatus(val);
    updateParams({ search, category, status: val });
  };

  const handleClear = () => {
    console.log("filters cleared");
    setSearch("");
    setCategory("all");
    setStatus("all");
    updateParams({ search: "", category: "all", status: "all" });
  };

  return (
    <Card className="rounded-3xl border-muted/60 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-4 space-y-0">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Filter className="h-5 w-5 text-muted-foreground" />
          Search & Filter
        </CardTitle>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="h-8 gap-1.5 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Search
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="h-10 rounded-xl pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Category
            </label>
            <Select value={category} onValueChange={handleCategoryChange}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue placeholder="Category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Gaming">Gaming</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
                <SelectItem value="Fashion">Fashion</SelectItem>
                <SelectItem value="Musical Instruments">Musical Instruments</SelectItem>
                <SelectItem value="Home Appliances"></SelectItem>
              </SelectContent>
            </Select>
          </div>




          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Status
            </label>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger className="h-10 rounded-xl">
                <SelectValue placeholder="Status" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SearchSellerProduct;