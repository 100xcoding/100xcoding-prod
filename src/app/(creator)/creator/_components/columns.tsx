"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Challenge } from "@prisma/client";

export const columns: ColumnDef<Challenge>[] = [
	{
		accessorKey: "title",
		header: ({ column }:any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Title
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	{
		accessorKey: "slug",
		header: ({ column }:any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Slug
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
	},
	// {
	// 	accessorKey: "price",
	// 	header: ({ column }:any) => {
	// 		return (
	// 			<Button
	// 				variant="ghost"
	// 				onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
	// 			>
	// 				Price
	// 				<ArrowUpDown className="ml-2 h-4 w-4" />
	// 			</Button>
	// 		);
	// 	},
	// 	cell: ({ row }) => {
	// 		const price = parseFloat(row.getValue("price") || "0");
	// 		const formatted = new Intl.NumberFormat("en-IN", {
	// 			style: "currency",
	// 			currency: "INR",
	// 		}).format(price);

	// 		return <div>{formatted}</div>;
	// 	},
	// },
	{
		accessorKey: "publish",
		header: ({ column }:any) => {
			return (
				<Button
					variant="ghost"
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
				>
					Published
					<ArrowUpDown className="ml-2 h-4 w-4" />
				</Button>
			);
		},
		cell: ({ row }:any) => {
			const isPublished = row.getValue("Publish") || false;

			return (
				<Badge className={cn("bg-slate-500", isPublished && "bg-sky-700")}>
					{isPublished ? "Published" : "Draft"}
				</Badge>
			);
		},
	},
	{
		id: "actions",
		cell: ({ row }:any) => {
			const { id } = row.original;

			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button
							variant="ghost"
							className="h-4 w-8 p-0"
						>
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<Link href={`/creator/challenges/${id}`}>
							<DropdownMenuItem>
								<Pencil className="h-4 w-4 mr-2" />
								Edit
							</DropdownMenuItem>
						</Link>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];