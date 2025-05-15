'use client'
import { useMemo, useState } from 'react'
import { ColumnDef } from "@tanstack/react-table";

// Helpers
import { Request } from '@/helpers/Request';

// Components
import Table from '@/components/DataTable/Table';
import TableLazy from '@/components/TableLazy';

// Other npm packages

import {useQuery} from '@tanstack/react-query'

import { HotelStatsTypes } from '../types/hotel-stats';

function index() {
    const getOtelStats = async() => {
        const payload = {
            db_Id: 9,
            xRez_Sirket: 9,
            xBas_Tar: "2024-06-01",
            xBit_Tar: "2024-06-10",
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
        queryKey: ['otelStats'],
        queryFn: getOtelStats,
        staleTime: 1000 * 60 * 5,         // 5 dakika boyunca "fresh"
        // cacheTime: 1000 * 60 * 30,        // 30 dakika boyunca cache'de tutulur
        refetchOnWindowFocus: false,      // Sekme odaklanınca tekrar fetch yapma
        refetchOnMount: false,            // Komponent her mount olduğunda refetch yapma
        refetchOnReconnect: true,         // İnternet bağlantısı gelince refetch yap
        refetchInterval: false,           // Otomatik aralıklarla fetch yapma
    })


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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
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
                            <path fill-rule="evenodd" d="M8 1a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L7.5 13.293V1.5A.5.5 0 0 1 8 1"/>
                            </svg>
                        </div>
                    );
                },
            },
        ],
        []
    );

    return (
        <div  className="w-full mx-auto bg-white rounded-sm ">
            <header  className="grid grid-cols-2 py-4 items-center border-b border-gray-100">
                <h2  className="font-semibold text-gray-800">Forecast</h2>
            </header>
            {!isLoading && otelStats?.value ? (
                <Table
                    data={otelStats.value!}
                    columns={columns}
                />
            ): (
                <TableLazy />
            )}
        </div>
    )
}

export default index