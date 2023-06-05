import moment from 'moment';
import { useMemo } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
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

type LineChartProps = AxisChartProps;

export default function LineChart({
  color,
  curveType,
  data,
  grid,
  scale,
  stackBy,
  xAxisTitle,
  xKey,
  yAxisTitle,
  yKey,
}: LineChartProps): JSX.Element {
  const timeframe = useMemo(() => {
    return determineTimeframe(stackBy ? data.formattedData : data, xKey);
  }, [data, stackBy, xKey]);
  return (
    <ResponsiveContainer>
      <RechartsLineChart
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
            <Line
              activeDot={{ strokeWidth: 1 }}
              dataKey={key}
              dot={false}
              fill={PALETTE[index % PALETTE.length]}
              key={key}
              stroke={PALETTE[index % PALETTE.length]}
              strokeWidth={2}
            />
          ))
        ) : (
          <Line
            activeDot={{ r: 5, strokeWidth: 0.5 }}
            isAnimationActive={false}
            dataKey={yKey}
            dot={false}
            stroke={color}
            type='monotone'
          />
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
          scale={scale}
          name={yAxisTitle}
          tickFormatter={(tick) => formatLargeNumber(tick)}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
