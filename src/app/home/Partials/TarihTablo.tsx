'use client'
import { useMemo, useEffect } from 'react'
import { ColumnDef } from "@tanstack/react-table";

// Helpers
import { Request } from '@/helpers/Request';

// Components
import Table from '@/components/DataTable/Table';
import TableLazy from '@/components/TableLazy';

// Other npm packages
import {useQuery} from '@tanstack/react-query'
import { HotelStatsTypes } from '@/app/types/hotel-stats';
import { useSearchParams } from "next/navigation";

interface GetOtelStatsProps {
    startDate?: string;
    endDate?: string;
}

function TarihTablo() {
    
    const searchParams = useSearchParams();

    const startDate = searchParams.get('start_date') ?? '2024-06-01';
    const endDate = searchParams.get('end_date') ?? "2024-06-20";

    const isValidDates = useMemo(() => startDate !== '' && endDate !== '', [startDate, endDate]);

    const  getOtelStats = async({
        startDate = '2024-06-01', 
        endDate = "2024-06-20"
    }: GetOtelStatsProps) => {
        
        const payload = {
            db_Id: 9,
            xRez_Sirket: 9,
            xBas_Tar: startDate,
            xBit_Tar: endDate,
            xtip: 1,
            kon1: "ALL",
            kon2: "BB",
            xchkFis_Fazla_otel_10: 0,
            bas_Yil: 2022,
            bit_Yil: 2022,
            fisrci_Kapalioda_10: 0,
            xRez_C_W: "C",
            xSistem_Tarihi: "2024-01-01",
            xAlis_Tarihi: "2024-01-01",
            sistem_Bas1: "2020-01-01",
            sistem_Bit1: "2029-01-01",
            pmdahil_10: 0,
            tip_1: "001",
            xFis_Bela_tutar_10: 0,
            trace_Dus_10: 0,
            cev_01: null,
        };

        const otelStats = await Request({
          method: 'POST',
          url: '/Procedure/StpRmforKlasik_2',
          data: payload
        });

        return otelStats
    } 

    const {
        data: otelStats,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['otelStats', startDate, endDate],
        queryFn: () => getOtelStats({ startDate, endDate }),
        enabled: isValidDates, // sadece iki tarih de varsa çalışsın
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        refetchInterval: false,
    });

    const columns: ColumnDef<HotelStatsTypes>[] = useMemo(
        () => [
            {
                accessorKey: "Tarih",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Tarih
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Mevcut",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Mevcut
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Oda",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Oda
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Yetişkin",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Yetişkin
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Çocuk",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Çocuk
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Toplam Kişi",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Toplam Kişi
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Pax",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Pax
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Yuzde%(Net)",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Yuzde%(Net)
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Son Durum",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Son Durum
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Package Tutar",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Package Tutar
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Gun Tarih",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Gun Tarih
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
            {
                accessorKey: "Pax(Y/C2)",
                header: ({ column }) => {
                    return (
                        <div
                            className="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:text-zinc-700"
                            onClick={() =>
                                column.toggleSorting(
                                    column.getIsSorted() === "asc"
                                )
                            }
                        >
                            Pax(Y/C2)
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  className="bi bi-arrow-down w-4 h-4" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
         <div  className="w-full px-4 bg-white rounded-sm ">
            {!isLoading && otelStats?.value ? (
                <Table
                    data={otelStats.value!}
                    columns={columns}
                    searchFilter={true}
                />
            ): (
                <TableLazy />
            )}
        </div>
    )
}

export default TarihTablo