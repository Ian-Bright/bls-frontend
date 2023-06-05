import Flex from 'components/Flex';
import Typography from 'components/Typography';
import { formatNumber } from 'utils';

type CounterProps = {
  counterKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  label: string;
};

export default function Counter({
  counterKey,
  data,
  label,
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
          <Typography variant='subtitle1'>{label}</Typography>
          <Typography variant='h4'>
            {formatNumber(data[0][counterKey], 0)}
          </Typography>
        </Flex>
      </Flex>
    </>
  );
}
