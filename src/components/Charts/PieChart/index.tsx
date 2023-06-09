import { useState } from 'react';
import {
  Cell,
  Pie,
  PieChart as RechartsPieChart,
  Sector,
  Tooltip as RechartsTooltip,
  TooltipProps,
} from 'recharts';

import Tooltip from '../components/Tooltip';
import { PALETTE } from 'utils/constants';

type PieChartProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: string;
  height: number;
  nameKey: string;
  showDecimals?: boolean;
  width: number;
};

export default function PieChart({
  data,
  dataKey,
  height,
  nameKey,
  showDecimals,
  width,
}: PieChartProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(-1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const activeShape = (props: any) => {
    const { cx, cy, endAngle, fill, innerRadius, outerRadius, startAngle } =
      props;
    return (
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius * 0.95}
        outerRadius={outerRadius * 1.05}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <RechartsPieChart height={height * 0.9} width={width}>
      <RechartsTooltip
        content={(props: TooltipProps<number, string>) => (
          <Tooltip
            {...props}
            isPie={true}
            showDecimals={showDecimals}
            xKey={nameKey}
          />
        )}
        wrapperStyle={{ outline: 'none', zIndex: 100 }}
      />
      <Pie
        activeIndex={activeIndex}
        activeShape={activeShape}
        cx='50%'
        cy='50%'
        data={data}
        dataKey={dataKey}
        labelLine={false}
        nameKey={nameKey}
        onMouseEnter={onPieEnter}
        onMouseLeave={() => setActiveIndex(-1)}
      >
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={PALETTE[index % PALETTE.length]} />
        ))}
      </Pie>
    </RechartsPieChart>
  );
}
