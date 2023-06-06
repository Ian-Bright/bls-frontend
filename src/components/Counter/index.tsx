import Flex from 'components/Flex';
import Typography from 'components/Typography';
import { formatNumber } from 'utils';

type CounterProps = {
  counterKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  label: string;
  showDecimal?: boolean;
};

export default function Counter({
  counterKey,
  data,
  label,
  showDecimal,
}: CounterProps): JSX.Element {
  return (
    <>
      <Flex
        alignItems='center'
        justifyContent='center'
        h='100%'
        style={{ color: '#FCFCFC' }}
      >
        <Flex direction='column' alignItems='center'>
          <Typography variant='h6'>{label}</Typography>
          <Typography variant='h4'>
            {formatNumber(data[0][counterKey], showDecimal ? 2 : 0)}
          </Typography>
        </Flex>
      </Flex>
    </>
  );
}
