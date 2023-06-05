import AreaChart from 'components/Charts/AreaChart';
import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import { useMemo } from 'react';

import { ChartScale, ChartType, StackBy } from 'utils/constants';
import PieChart from '../PieChart';
import { generateStackData } from 'utils';

type ChartWrapperProps = {
  chartType: string;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  grid?: boolean;
  stackBy?: StackBy;
  scale?: ChartScale;
  xAxisTitle: string;
  xKey: string;
  yAxisTitle: string;
  yKey: string;
};

export default function ChartWrapper({
  chartType,
  color,
  data,
  grid,
  scale = ChartScale.Linear,
  stackBy,
  xAxisTitle,
  xKey,
  yAxisTitle,
  yKey,
}: ChartWrapperProps): JSX.Element {
  const stackedData = useMemo(() => {
    if (!stackBy) return [];
    return generateStackData(data, stackBy, xKey);
  }, [data, stackBy, xKey]);

  // TODO: Remove and place sort on DB side
  const sortedData = useMemo(() => {
    if (stackBy && !stackedData.formattedData.length) return [];
    const sorted = (stackBy ? stackedData.formattedData : data).sort(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (a: any, b: any) => {
        if (typeof a[xKey] === 'object') {
          return (
            new Date(a[xKey].value).getTime() -
            new Date(b[xKey].value).getTime()
          );
        } else if (!isNaN(a[xKey])) {
          return a - b;
        } else {
          return new Date(a[xKey]).getTime() - new Date(b[xKey]).getTime();
        }
      }
    );
    if (stackBy) {
      return {
        formattedData: sorted,
        keys: stackedData.keys,
      };
    }
    return sorted;
  }, [data, stackBy, stackedData, xKey]);

  if (chartType === ChartType.Area) {
    return (
      <AreaChart
        color={color}
        data={sortedData}
        grid={!!grid}
        scale={scale}
        stackBy={stackBy}
        xAxisTitle={xAxisTitle}
        xKey={xKey || 'x'}
        yAxisTitle={yAxisTitle}
        yKey={yKey || 'y'}
      />
    );
  } else if (chartType === ChartType.Bar) {
    return (
      <BarChart
        color={color}
        data={sortedData}
        grid={!!grid}
        scale={scale}
        stackBy={stackBy}
        xAxisTitle={xAxisTitle}
        xKey={xKey || 'x'}
        yAxisTitle={yAxisTitle}
        yKey={yKey || 'y'}
      />
    );
  } else if (chartType === ChartType.Line) {
    return (
      <LineChart
        color={color}
        curveType='basis'
        data={sortedData}
        grid={!!grid}
        scale={scale}
        stackBy={stackBy}
        xAxisTitle={xAxisTitle}
        xKey={xKey || 'x'}
        yAxisTitle={yAxisTitle}
        yKey={yKey || 'y'}
      />
    );
  } else {
    return <PieChart data={data} dataKey={yKey || 'y'} nameKey={xKey || 'x'} />;
  }
}
