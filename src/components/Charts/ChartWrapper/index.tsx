import AreaChart from 'components/Charts/AreaChart';
import BarChart from 'components/Charts/BarChart';
import LineChart from 'components/Charts/LineChart';
import { useMemo } from 'react';

import { ChartScale, ChartType, StackBy } from 'utils/constants';
import PieChart from '../PieChart';
import { generateStackData } from 'utils';
import AutoSizer from 'react-virtualized-auto-sizer';

type ChartWrapperProps = {
  chartType: string;
  color: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  grid?: boolean;
  scale?: ChartScale;
  showDecimals?: boolean;
  stackBy?: StackBy;
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
  showDecimals,
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
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <AreaChart
            color={color}
            data={sortedData}
            grid={!!grid}
            height={height}
            scale={scale}
            showDecimals={showDecimals}
            stackBy={stackBy}
            width={width}
            xAxisTitle={xAxisTitle}
            xKey={xKey || 'x'}
            yAxisTitle={yAxisTitle}
            yKey={yKey || 'y'}
          />
        )}
      </AutoSizer>
    );
  } else if (chartType === ChartType.Bar) {
    return (
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <BarChart
            color={color}
            data={sortedData}
            grid={!!grid}
            height={height}
            scale={scale}
            showDecimals={showDecimals}
            stackBy={stackBy}
            width={width}
            xAxisTitle={xAxisTitle}
            xKey={xKey || 'x'}
            yAxisTitle={yAxisTitle}
            yKey={yKey || 'y'}
          />
        )}
      </AutoSizer>
    );
  } else if (chartType === ChartType.Line) {
    return (
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <LineChart
            color={color}
            curveType='basis'
            data={sortedData}
            grid={!!grid}
            height={height}
            scale={scale}
            showDecimals={showDecimals}
            stackBy={stackBy}
            width={width}
            xAxisTitle={xAxisTitle}
            xKey={xKey || 'x'}
            yAxisTitle={yAxisTitle}
            yKey={yKey || 'y'}
          />
        )}
      </AutoSizer>
    );
  } else {
    return (
      <AutoSizer>
        {({ height, width }: { height: number; width: number }) => (
          <PieChart
            data={data}
            dataKey={yKey || 'y'}
            height={height}
            nameKey={xKey || 'x'}
            showDecimals={showDecimals}
            width={width}
          />
        )}
      </AutoSizer>
    );
  }
}
