import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// interface veya type
import { ChartProps } from "./components";

const Chart: React.FC<ChartProps> = ({ data }) => {
  const formattedData = data.map((item) => ({
    ...item,
    Tarih: new Date(item.Tarih).toLocaleDateString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
    }),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={formattedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Tarih" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Free" fill="#8884d8" name="Boş Oda" stackId="a" />
        <Bar dataKey="Mevcut" fill="#82ca9d" name="Oda Sayısı"   />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default Chart;