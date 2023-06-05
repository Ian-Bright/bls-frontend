import moment from 'moment';
import { useMemo } from 'react';
import {
  Area,
  AreaChart as RechartsAreaChart,
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

type AreaChartProps = Omit<AxisChartProps, 'curveType'>;

export default function AreaChart({
  color,
  data,
  grid,
  scale,
  stackBy,
  xAxisTitle,
  xKey,
  yAxisTitle,
  yKey,
}: AreaChartProps): JSX.Element {
  const timeframe = useMemo(() => {
    return determineTimeframe(stackBy ? data.formattedData : data, xKey);
  }, [data, stackBy, xKey]);

  return (
    <ResponsiveContainer>
      <RechartsAreaChart
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
            <Area
              activeDot={{ r: 2, strokeWidth: 1 }}
              dataKey={key}
              fill={PALETTE[index % PALETTE.length]}
              fillOpacity={0.75}
              key={key}
              stackId={'1'}
              stroke={PALETTE[index % PALETTE.length]}
              type='linear'
            />
          ))
        ) : (
          <Area
            activeDot={{ r: 5, strokeWidth: 0.5 }}
            dataKey={yKey}
            dot={false}
            fill={color}
            fillOpacity={0.6}
            isAnimationActive={false}
            stroke={color}
            type='monotone'
          />
        )}
        <XAxis
          dataKey={(x) => handleXKey(x, xKey)}
          label={X_AXIS_LABEL_INSTRUCTIONS(xAxisTitle ?? '')}
          fontSize={TICKMARK_FONT_SIZE}
          tickFormatter={(tick) =>
            timeframe ? moment(tick).format(timeframe) : tick
          }
        />
        <YAxis
          dataKey={stackBy ? '' : yKey}
          domain={[0, 'auto']}
          fontSize={TICKMARK_FONT_SIZE}
          label={Y_AXIS_LABEL_INSTRUCTIONS(yAxisTitle ?? '')}
          tickFormatter={(tick) => formatLargeNumber(tick)}
          scale={scale}
        />
      </RechartsAreaChart>
    </ResponsiveContainer>
  );
}
