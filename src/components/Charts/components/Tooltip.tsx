import Flex from 'components/Flex';
import moment from 'moment';
import { createUseStyles } from 'react-jss';
import { TooltipProps as RechartsTooltipProps } from 'recharts';
import { formatNumber, isDateOrTimestamp } from 'utils';

const useStyles = createUseStyles({
  container: {
    backgroundColor: '#34383D',
    border: '1px solid #717371',
    borderRadius: '4px',
    fontSize: '16px',
    padding: '12px',
  },
});

type TooltipProps = {
  isPie?: boolean;
  showDecimals?: boolean;
  xKey: string;
} & RechartsTooltipProps<number, string>;

export default function Tooltip(props: TooltipProps): JSX.Element {
  const { isPie, label, payload, showDecimals, xKey } = props;
  const styles = useStyles();
  if (!payload || payload[0] === undefined) return <></>;
  return (
    <div className={styles.container}>
      {isPie ? (
        <>
          <Flex key={xKey} gap='12px' style={{ color: '#FCFCFC' }}>
            <div>{xKey}:</div>
            <div>
              {isDateOrTimestamp(payload[0].name)
                ? moment(payload[0].name).format('MMM Do, YYYY')
                : payload[0].name}
            </div>
          </Flex>
          <Flex gap='12px' style={{ color: payload[0].payload.fill }}>
            <div>{payload[0].dataKey}:</div>
            <div>
              {formatNumber(payload[0].value ?? 0, showDecimals ? 2 : 0)}
            </div>
          </Flex>
        </>
      ) : (
        <>
          <Flex key={xKey} gap='12px' style={{ color: '#FCFCFC' }}>
            <div>{xKey}:</div>
            <div>
              {isDateOrTimestamp(label)
                ? moment(label).format('MMM Do, YYYY')
                : label}
            </div>
          </Flex>
          {payload.map(({ color, name, payload: { fill }, value }) => (
            <Flex key={name} gap='12px' style={{ color: color ?? fill }}>
              <div>{name}:</div>
              <div>{formatNumber(value ?? 0, showDecimals ? 2 : 0)}</div>
            </Flex>
          ))}
        </>
      )}
    </div>
  );
}
