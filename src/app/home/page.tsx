'use client'
import { useMemo, useState } from 'react'

// Helpers
import { Request } from '@/helpers/Request';

// Components
import TableLazy from '@/components/TableLazy';

import Filters from '@/app/home/Partials/Filters';
import Tabs from '@/app/home/Partials/Tabs';

import ForecastDate from './Partials/ForecastDate';
import ForecastGraph from './Partials/ForecastGraph';

// Other npm packages
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from "next/navigation";

// Interfaces
interface GetOtelStatsProps {
    startDate?: string;
    endDate?: string;
}

function index() {
    
    const searchParams = useSearchParams();
    const activeTab = searchParams.get('type') ?? 'date';
    const startDate = searchParams.get('start_date') ?? '2024-06-01';
    const endDate = searchParams.get('end_date') ?? "2024-06-20";

    const isValidDates = useMemo(() => startDate !== '' && endDate !== '', [startDate, endDate]);

    const getOtelStats = async({
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

    return ( 
        <div className="w-full mx-auto">
             <div  className="w-full px-4 bg-white rounded-sm ">
                {!isLoading && otelStats?.value ? (
                    <>
                        <Filters />
                        <Tabs />
                        {activeTab == 'date' ? (
                            <ForecastDate data={otelStats.value} />
                        ): (
                            <ForecastGraph data={otelStats.value} />
                        )}
                    </>
                ): (
                    <TableLazy />
                )}
            </div>
        </div>
    )
}

export default index