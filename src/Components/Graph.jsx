import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

// const data = [
//   { name: Object.keys(categoryPercentages.entertainment), value: Object.values(categoryPercentages.entertainment) },
//   { name: Object.keys(categoryPercentages.food), value: Object.values(categoryPercentages.food) },
//   { name: Object.keys(categoryPercentages.travel), value: Object.values(categoryPercentages.travel) },
// ];

const RADIAN = Math.PI / 180;
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Graph({categoryPercentages}) {

  
  const data = [
    { name: "entertainment", value: categoryPercentages.entertainment || 0 },
    { name: "food", value: categoryPercentages.food || 0 },
    { name: "travel", value: categoryPercentages.travel || 0 },
  ];

  console.log("Graph Data:", data);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={199} height={199}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
