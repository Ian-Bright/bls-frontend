import moment from 'moment';
import { useMemo } from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from 'recharts';
import { determineTimeframe, formatLargeNumber, handleXKey } from 'utils';

import Tooltip from '../components/Tooltip';
import {
  AxisChartProps,
  PALETTE,
  TICKMARK_FONT_SIZE,
  X_AXIS_LABEL_INSTRUCTIONS,
  Y_AXIS_LABEL_INSTRUCTIONS,
} from 'utils/constants';

type BarChartProps = Omit<AxisChartProps, 'curveType'>;

export default function BarChart({
  color,
  data,
  grid,
  scale,
  stackBy,
  xAxisTitle,
  xKey,
  yAxisTitle,
  yKey,
}: BarChartProps): JSX.Element {
  const timeframe = useMemo(() => {
    return determineTimeframe(stackBy ? data.formattedData : data, xKey);
  }, [data, stackBy, xKey]);

  return (
    <ResponsiveContainer>
      <RechartsBarChart
        data={stackBy ? data.formattedData : data}
        margin={{ bottom: xAxisTitle ? 15 : 0, left: 5 }}
      >
        {grid && <CartesianGrid strokeDasharray='3 3' />}
        <RechartsTooltip
          content={(props: TooltipProps<number, string>) => (
            <Tooltip {...props} xKey={xKey} />
          )}
          wrapperStyle={{ outline: 'none', zIndex: 100 }}
        />
        {stackBy ? (
          data.keys?.map((key: string, index: number) => (
            <Bar
              dataKey={key}
              fill={PALETTE[index % PALETTE.length]}
              fillOpacity={1}
              isAnimationActive={false}
              key={key}
              stackId={'1'}
              type='monotone'
            />
          ))
        ) : (
          <Bar dataKey={yKey} fill={color} isAnimationActive={false} />
        )}
        <XAxis
          dataKey={(x) => handleXKey(x, xKey)}
          fontSize={TICKMARK_FONT_SIZE}
          label={X_AXIS_LABEL_INSTRUCTIONS(xAxisTitle)}
          name={xAxisTitle}
          tickFormatter={(tick) =>
            timeframe ? moment(tick).format(timeframe) : tick
          }
        />
        <YAxis
          dataKey={stackBy ? '' : yKey}
          domain={[0, 'auto']}
          fontSize={TICKMARK_FONT_SIZE}
          label={Y_AXIS_LABEL_INSTRUCTIONS(yAxisTitle ?? '')}
          name={yAxisTitle}
          scale={scale}
          tickFormatter={(tick) => formatLargeNumber(tick)}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
}
