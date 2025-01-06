"use client"

import Link from "next/link"
import { Button } from "../ui/button"
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from '@mui/icons-material/Search';
import { useState } from "react";

interface DashboardHeaderProps {
    onSearch: (searchTerm: string) => void;
}

const DashboardHeader = ({ onSearch }: DashboardHeaderProps) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        onSearch(event.target.value);
    };

    return (
        <div className="flex h-20 items-center justify-center px-8 select-none">
            <h1 className="text-3xl font-bold">😎My products</h1>

            <div className="mx-4 flex-1 rounded-2xl h-12 flex items-center pl-4 border-indigo-200 border-2">
                <SearchIcon />
                <input
                    type="text"
                    placeholder="Search products"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="mx-2 border-none outline-none flex-1"
                />
            </div>

            <Link href="/dashboard/add-product" className="ml-auto">
                <Button variant="outline" type="button">
                    <AddIcon />
                    Add product
                </Button>
            </Link>
        </div>
    )
}

export default DashboardHeader