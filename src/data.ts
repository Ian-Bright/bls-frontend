import { ChartType } from "utils/constants";

export const COUNTERS = [
    {
        counterKey: 'Num_Wallets_Created',
        label: 'BLS Wallets Created',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Wallets'
    },
    {
        counterKey: 'Num_Wallets_Recovered',
        label: 'BLS Wallets Recovered',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Wallets'
    },
    {
        counterKey: 'Num_Bundles_Submitted',
        label: 'Bundles Submitted',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Tx Groups'
    },
    {
        counterKey: 'Num_Operations_Submitted',
        label: 'Operations Submitted',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Tx Groups'
    },
    {
        counterKey: 'Num_Operations_Failed',
        label: 'Operations Failed',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Tx Groups'
    },
    {
        counterKey: 'Num_Actions_Submitted',
        label: 'Actions Submitted',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Tx Groups'
    },
    {
        counterKey: 'Avg_Operations_Per_Bundle',
        label: 'Operations/Bundle',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        showDecimal: true,
        title: 'Averages'
    },
    {
        counterKey: 'Avg_Actions_Per_Bundle',
        label: 'Actions/Bundle',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        showDecimal: true,
        title: 'Averages'
    },
    {
        counterKey: 'Avg_Actions_Per_Operation',
        label: 'Actions/Operations',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        showDecimal: true,
        title: 'Averages'
    },
    {
        counterKey: 'minGas',
        label: 'Min Gas per Tx',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Gas'
    },
    {
        counterKey: 'maxGas',
        label: 'Max Gas per Tx',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Gas'
    },
    {
        counterKey: 'Avg_Gas',
        label: 'Ave Gas per Tx',
        queryId: 'aa55c0623a28438eac9aecfb7b767726',
        title: 'Gas'
    },
];

export const CHARTS = [
    {
        chartType: ChartType.Bar,
        color: '#B8B7D0',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Number of Wallets Created By Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Number of Wallets Created',
        yKey: 'Num_Wallets_Created'
    },
    {
        chartType: ChartType.Bar,
        color: '#84abd9',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Number of Wallets Recovered By Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Number of Wallets Recovered',
        yKey: 'Num_Wallets_Recovered'
    },
    {
        chartType: ChartType.Bar,
        color: '#CE83D9',
        description: 'Number of bundles (a group of operations containing actions) submitted on-chain',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Number of Bundles Submitted per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Bundles Submitted',
        yKey: 'Num_Bundles_Submitted'
    },
    {
        chartType: ChartType.Bar,
        color: '#8784D8',
        description: 'Number of Actions (function calls coming from a signed operation) submitted on-chain',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Number of Actions Submitted per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Actions Submitted',
        yKey: 'Num_Actions_Submitted'
    },
    {
        chartType: ChartType.Bar,
        color: '#C6C5CF',
        description: 'Number of Operations (a group of actions) submitted on-chain',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Number of Operations Submitted per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Number of Operations',
        yKey: 'Num_Operations_Submitted'
    },
    {
        chartType: ChartType.Bar,
        color: '#E4214F',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Number of Operations Failed per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Failed Operations',
        yKey: 'Num_Operations_Failed'
    },
    {
        chartType: ChartType.Bar,
        color: '#84D9CC',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        showDecimals: true,
        title: 'Average Operations per Bundle per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Average Operations per Bundle',
        yKey: 'Avg_Operations_Per_Bundle'
    },
    {
        chartType: ChartType.Bar,
        color: '#8784D8',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        showDecimals: true,
        title: 'Average Actions per Bundle per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Actions',
        yKey: 'Avg_Actions_Per_Bundle'
    },
    {
        chartType: ChartType.Bar,
        color: '#B6B6BF',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        showDecimals: true,
        title: 'Average Actions per Operation per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Actions per Operation',
        yKey: 'Avg_Actions_Per_Operation'
    },
    {
        chartType: ChartType.Bar,
        color: '#1B4FC2',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Min Gas per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Min Gas Per Transaction',
        yKey: 'minGas'
    },
    {
        chartType: ChartType.Bar,
        color: '#C2431B',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Max Gas per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Maximum Gas Per Transaction',
        yKey: 'maxGas'
    },
    {
        chartType: ChartType.Bar,
        color: '#A19FCD',
        queryId: 'ab1a30af5991425b8b4abd7c37f859fa',
        title: 'Average Gas per Day',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Average Gas per Transaction',
        yKey: 'avgGas'
    },
    {
        chartType: ChartType.Pie,
        queryId: '7ad7fb1828094272880202e903af4239',
        title: 'Action Method Ids Called',
        xKey: 'actionMethodId',
        yKey: 'action_count'
    },
    {
        chartType: ChartType.Pie,
        queryId: '2578dd88f123458183e0fe077d285243',
        title: 'Action Recipients',
        xKey: 'actionsRecipient',
        yKey: 'action_count'
    },
    {
        chartType: ChartType.Bar,
        queryId: '74a8783fd397441ca0dd9cbc96423e81',
        stackBy: {
            stackColumn: 'actionMethodId',
            valueColumn: 'action_count'
        },
        title: 'Actions Grouped By Method Id',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Actions Grouped by Method Id',
    },
    {
        chartType: ChartType.Bar,
        queryId: '8616b0bfad394b3c8314c6573497b472',
        stackBy: {
            stackColumn: 'actionsRecipient',
            valueColumn: 'action_count'
        },
        title: 'Actions Grouped By Recipient',
        xAxisTitle: 'Day',
        xKey: 'day',
        yAxisTitle: 'Actions Grouped By Recipient',
    },
];

export const SECTIONS = [
    {
        charts: [0, 2],
        counters: [0, 2],
        description: 'BLS smart-contract wallets for use with WAX',
        title: 'Wallets',
    },
    {
        charts: [2, 6],
        counters: [2, 6],
        description: 'Bundles, submitted on-chain, encompass Operations that carry Actions - the actual function calls.',
        title: 'Bundle Composition'
    },
    {
        charts: [6, 9],
        counters: [6, 9],
        description: 'Bundle, Operations, & Actions Relationship',
        title: 'Averages',
    },
    {
        charts: [9, 12],
        counters: [9, 12],
        description: 'The gas expenses for each bundle submission.',
        title: 'Gas',
    },
    {
        charts: [12],
        counters: [],
        description: 'Metrics related to the contracts called and method IDs invoked within BLS Wallet actions.',
        title: 'Actions'
    }
];