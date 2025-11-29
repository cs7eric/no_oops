import React from 'react';
import { RadialBarChart, RadialBar, Legend, Tooltip, ResponsiveContainer } from 'recharts';

interface SkillData {
  name: string;
  level: number;
  fill: string;
}

interface RadialChartProps {
  data: SkillData[];
  title: string;
  className?: string;
}

const RadialChart: React.FC<RadialChartProps> = ({ data, title, className = '' }) => {
  return (
    <div className={`bg-content1 rounded-2xl border border-default-200 p-6 shadow-sm ${className}`}>
      <h3 className="text-xl font-semibold mb-4 text-center">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            innerRadius="10%" 
            outerRadius="100%" 
            barSize={12}
            data={data}
            startAngle={180} 
            endAngle={0}
          >
            <RadialBar
              background
              dataKey="level"
              cornerRadius={10}
            />
            <Tooltip 
              formatter={(value) => [`${value}%`, 'Proficiency']}
              labelFormatter={(name) => `${name}`}
            />
            <Legend 
              iconSize={10}
              layout='vertical'
              verticalAlign='middle'
              align="right"
              wrapperStyle={{ paddingLeft: '20px' }}
            />
          </RadialBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadialChart;