import React from 'react'

import Chart from '@/components/Chart';

import { HotelStatsTypes } from '@/app/types/hotel-stats';

interface GrafikTabloProps {
    data: HotelStatsTypes[]
}

function ForecastGraph({
    data
}: GrafikTabloProps) {
    return (
        <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Oda / Yetişkin / Çocuk Grafik</h1>
            <Chart
                data={data} 
            /> 
        </div>
    )
}

export default ForecastGraph