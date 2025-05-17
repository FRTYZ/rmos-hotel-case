import { HotelStatsTypes } from '@/app/types/hotel-stats';

// Forecast graph
export interface ForecastGraphProps {
    data: HotelStatsTypes[]
}

// Forecast Table
export interface ForecastTableProps {
    data: HotelStatsTypes[]
}

// Stats veriler
export interface GetOtelStatsProps {
    startDate?: string;
    endDate?: string;
}
