import Counter from 'components/Counter';
import { CHARTS, COUNTERS } from 'data';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Flex from 'components/Flex';
import ChartWrapper from 'components/Charts/ChartWrapper';
import Typography from 'components/Typography';

const { REACT_APP_API_URL } = process.env;

const useStyles = createUseStyles({
  card: {
    backgroundColor: '#34383D',
    borderRadius: '4px',
    padding: '20px',
  },
  container: {
    padding: '16px',
  },
});

type Layout = {
  charts: any[];
  counters: any[];
};

function App() {
  const styles = useStyles();
  const [layout, setLayout] = useState<Layout>({
    charts: [],
    counters: [],
  });

  useEffect(() => {
    (async () => {
      const res = await fetch(`${REACT_APP_API_URL}/queries`);
      const data = await res.json();
      const charts = CHARTS.map((chart) => ({
        ...chart,
        data: data[chart.queryId],
      }));
      const counters = COUNTERS.map((counter) => ({
        ...counter,
        data: data[counter.queryId],
      }));
      setLayout({ counters, charts });
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Flex
        justifyContent='center'
        mb='32px'
        mt='32px'
        style={{ color: '#FCFCFC' }}
      >
        <Typography variant='h4'>BLS Wallet Analytics</Typography>
      </Flex>
      <Flex childFlex='1 0 calc(25% - 60px)' gap='6px' wrap='wrap'>
        {layout.counters.map((counter) => (
          <div className={styles.card} style={{ height: '200px' }}>
            <Typography style={{ color: '#FCFCFC' }} variant='h6'>
              {counter.title}
            </Typography>
            <Counter
              counterKey={counter.counterKey}
              data={counter.data}
              label={counter.label}
            />
          </div>
        ))}
      </Flex>
      <Flex childFlex='1 0 calc(50% - 60px)' gap='6px' mt='16px' wrap='wrap'>
        {layout.charts.map((chart) => (
          <div className={styles.card} style={{ height: '350px' }}>
            <Typography
              style={{ color: '#FCFCFC', marginBottom: '8px' }}
              variant='h6'
            >
              {chart.title}
            </Typography>
            <ChartWrapper
              color={chart.color}
              chartType={chart.chartType}
              data={chart.data}
              stackBy={chart.stackBy}
              xAxisTitle={chart.xAxisTitle}
              xKey={chart.xKey}
              yAxisTitle={chart.yAxisTitle}
              yKey={chart.yKey}
            />
          </div>
        ))}
      </Flex>
    </div>
  );
}

export default App;
