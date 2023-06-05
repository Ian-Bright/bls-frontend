import { MS_PER_MONTH, MS_PER_WEEK, MS_PER_YEAR } from "./constants";
import { StackBy } from "./constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const determineTimeframe = (data: any[], xKey: string): string => {
    if (!data) return '';
    let startTime = data[0][xKey];
    let endTime = data[data.length - 1][xKey];
    // Check for bigquery date format
    if (typeof startTime === 'object' || typeof endTime === 'object') {
        startTime = startTime.value;
        endTime = endTime.value;
    }

    if (isDateOrTimestamp(startTime) && isDateOrTimestamp(endTime)) {
        const elapsed = new Date(endTime).getTime() - new Date(startTime).getTime();
        if (elapsed >= MS_PER_YEAR) {
            return `MMM Do, YYYY`;
        } else if (elapsed >= MS_PER_MONTH) {
            return `MMM Do`;
        } else if (elapsed >= MS_PER_WEEK) {
            return `Do`;
        } else {
            return `HH:mm`;
        }
    } else {
        return '';
    }
};

/**
 * Add commas to large numbers and limit to three decimal places if nonzero
 * @param {number|string} num - The number to format
 * @param {number} decimals - The number of decimals to show
 * @return {string} - The formatted number
 */
export const formatNumber = (num: number | string, decimals = 2): string => {
    if (!num) return '0'; // Don't append decimals to 0
    // If desired decimals exceed max significant decimal places then do not convert to float
    // and directly commify instead (here for number inputs)
    try {
        if (typeof num === 'string') {
            num = parseFloat(num);
        }
        return num.toLocaleString(undefined, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
        });
    } catch (e) {
        return '0';
    }
};

export const formatLargeNumber = (num: number | string): string => {
    num = Number(num);
    if (num >= 10 ** 12) {
        return `${formatNumber(num / 10 ** 12, 1)}t`;
    }
    if (num >= 10 ** 9) {
        return `${formatNumber(num / 10 ** 9, 1)}b`;
    }
    if (num >= 10 ** 6) {
        return `${formatNumber(num / 10 ** 6, 1)}m`;
    }
    if (num >= 10 ** 5) {
        return `${formatNumber(num / 10 ** 3, 1)}k`;
    }
    return formatNumber(num, 1);
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export const isDateOrTimestamp = (value: any): boolean => {
    return isNaN(value) && !isNaN(Date.parse(value));
};

/**
 *
 * @param data {any} - data at specific index in data array
 * @param key {string} - Key to parse from data
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const handleXKey = (data: any, key: string) => {
    const val = data[key];
    // If val is object we can assume it is a BigQuery date. Return value inside
    if (val instanceof Object) {
        return val.value;
    }
    return val;
};

export const generateStackData = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    rows: any[],
    stackBy: StackBy,
    xKey: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
): any => {
    const { stackColumn, valueColumn } = stackBy;
    const unique = uniqueValues(stackColumn, rows);
    const keyObj = setToObject(unique);
    const reduceByXKey = rows.reduce((obj, entry) => {
        const parsedXKey = handleXKey(entry, xKey);
        // If date doesn't exist then intialize with all keys
        if (!obj[parsedXKey]) {
            obj[parsedXKey] = { ...keyObj };
        }
        obj[parsedXKey][entry[stackColumn]] = entry[valueColumn];
        return obj;
    }, {});
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
    const formattedData = Object.entries(reduceByXKey).map((entry: any) => {
        return {
            [xKey]: entry[0],
            ...entry[1],
        };
    });
    return { formattedData, keys: Array.from(unique) };
};

export const setToObject = (set: Set<string>): { [key: string]: number } => {
    const obj: { [key: string]: number } = {};
    set.forEach((value) => {
        obj[value] = 0;
    });
    return obj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uniqueValues = (key: string, rows: any[]): Set<string> => {
    const set: Set<string> = new Set();
    rows.forEach((row) => {
        if (row[key] !== null) set.add(row[key]);
    });
    return set;
};