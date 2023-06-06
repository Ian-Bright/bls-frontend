import { CurveType } from 'recharts/types/shape/Curve';

export type AxisChartProps = {
    color: string;
    curveType: CurveType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    grid: boolean;
    height?: number;
    scale: ChartScale;
    showDecimals?: boolean;
    stackBy?: StackBy;
    width?: number;
    xAxisTitle: string;
    xKey: string;
    yAxisTitle?: string;
    yKey: string;
};

export enum ChartScale {
    Linear = 'linear',
    Log = 'log',
}

export enum ChartType {
    Area = 'area',
    Bar = 'bar',
    Line = 'line',
    Pie = 'pie',
    Counter = 'counter',
}

export const MS_PER_DAY = 24 * 60 * 60 * 1000; // Milleseconds per day
export const MS_PER_WEEK = 7 * MS_PER_DAY; // Milleseconds per week
export const MS_PER_MONTH = 30.44 * MS_PER_DAY; // Milleseconds per month
export const MS_PER_YEAR = 365.25 * MS_PER_DAY; // Millesconds per year

export const PALETTE = [
    '#84ACCE',
    '#74FFCE',
    '#E040FB',
    '#3F51B5',
    '#F18F01'

];

export type StackBy = {
    stackColumn: string;
    valueColumn: string;
};

export const AXIS_LABEL_FONT_SIZE = '16px';
export const TICKMARK_FONT_SIZE = 14;
export const X_AXIS_LABEL_INSTRUCTIONS = (title: string): object => ({
    dy: 15,
    style: { fontSize: '14px' },
    value: title,
});
export const Y_AXIS_LABEL_INSTRUCTIONS = (title: string): object => ({
    angle: -90,
    dx: 0,
    position: 'insideLeft',
    style: { fontSize: '16px', textAnchor: 'middle' },
    value: title,
});