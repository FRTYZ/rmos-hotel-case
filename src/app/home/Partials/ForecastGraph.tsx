import { useMemo } from 'react'

import Chart from '@/components/Chart';

// interface ve type
import { HotelStatsTypes } from '@/app/types/hotel-stats';

interface GrafikTabloProps {
    data: HotelStatsTypes[]
}

function ForecastGraph({
    data
}: GrafikTabloProps) {

    /* 
        useMemo ile rapor özetin alınması
    */
    const stats = useMemo(() => {
        const totalItems = data.length
        const totalNetOda = data.reduce((acc, item) => acc + item["Net Oda"], 0)
        const totalYatakPercent = data.reduce((acc, item) => acc + item["Yatak(%)"], 0)
        const totalYetişkin = data.reduce((acc, item) => acc + item["Yetişkin"], 0)
        const totalÇocuk = data.reduce((acc, item) => acc + item["Çocuk"], 0)
        const totalFree = data.reduce((acc, item) => acc + item["Free"], 0)

        return {
            odaOrtalama: totalNetOda / totalItems,
            yatakOrtalama: totalYatakPercent / totalItems,
            toplamYetişkin: totalYetişkin,
            toplamÇocuk: totalÇocuk,
            toplamFree: totalFree,
        }
    }, [])
        
    return (
        <div className="p-4 space-y-6">
            <main className="px-6 py-2 max-w-2xl">
                <h1 className="text-2xl font-bold mb-4">Rapor Özeti</h1>
                <div className="space-y-2 text-lg">
                    <p>🛏️ Oda Ortalaması: <strong>{stats.odaOrtalama.toFixed(2)}</strong></p>
                    <p>🛌 Yatak Doluluk Ortalaması: <strong>{(stats.yatakOrtalama * 100).toFixed(2)}%</strong></p>
                    <p>👨‍👩‍👧‍👦 Toplam Yetişkin Sayısı: <strong>{stats.toplamYetişkin}</strong></p>
                    <p>🧒 Toplam Çocuk Sayısı: <strong>{stats.toplamÇocuk}</strong></p>
                    <p>🎟️ Toplam Boş Oda Sayısı: <strong>{stats.toplamFree}</strong></p>
                </div>
            </main>
            <hr />
            <Chart
                data={data} 
            /> 
        </div>
    )
}

export default ForecastGraph