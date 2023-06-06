import Counter from 'components/Counter';
import { CHARTS, COUNTERS, SECTIONS } from 'data';
import { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import Flex from 'components/Flex';
import ChartWrapper from 'components/Charts/ChartWrapper';
import Typography from 'components/Typography';
import logo from 'assets/images/waxGreenLogo.webp';

const { REACT_APP_API_URL } = process.env;

const useStyles = createUseStyles({
  card: {
    backgroundColor: '#34383D',
    border: '1px solid #74FFCE',
    borderRadius: '4px',
    color: '#74FFCE',
    padding: '20px',
  },
  container: {
    padding: '16px 16px 120px 16px',
  },
});

type Layout = {
  charts: any[];
  counters: any[];
  description?: string;
  title: string;
};

function App() {
  const styles = useStyles();
  const [layout, setLayout] = useState<Layout[]>([]);

  useEffect(() => {
    (async () => {
      const res = await fetch(`${REACT_APP_API_URL}/queries`);
      const data = await res.json();

      setLayout(
        SECTIONS.map((section) => {
          let charts: any[] = [];
          let counters: any[] = [];
          if (section.charts[0] !== undefined) {
            const range = section.charts;
            charts = range[1]
              ? CHARTS.slice(range[0], range[1])
              : CHARTS.slice(range[0]);
          }
          if (section.counters[0] !== undefined) {
            const range = section.counters;
            counters = range[1]
              ? COUNTERS.slice(range[0], range[1])
              : COUNTERS.slice(range[0]);
          }
          return {
            ...section,
            charts: charts.map((chart) => ({
              ...chart,
              data: data[chart.queryId],
            })),
            counters: counters.map((counter) => ({
              ...counter,
              data: data[counter.queryId],
            })),
          };
        })
      );
    })();
  }, []);

  return (
    <div className={styles.container}>
      <Flex justifyContent='flex-end'>
        <a href='https://getwax.org' rel='noreferrer' target='_blank'>
          <img alt='Logo' src={logo} style={{ height: '40px' }} />
        </a>
      </Flex>
      <Flex
        alignItems='center'
        justifyContent='center'
        mb='32px'
        mt='12px'
        style={{ color: '#74FFCE' }}
      >
        <Typography variant='h2'>WAX V1 Analytics</Typography>
      </Flex>
      {layout.map((section) => (
        <div>
          <div className={styles.card} style={{ marginBlock: '32px' }}>
            <Typography variant='h4'>{section.title}</Typography>
            {section.description && (
              <Typography style={{ marginTop: '4px' }} variant='subtitle1'>
                <i>{section.description}</i>
              </Typography>
            )}
          </div>
          <Flex
            childFlex='1 0 calc(25% - 60px)'
            gap='6px'
            justifyContent='center'
            wrap='wrap'
          >
            {section.counters.map((counter) => (
              <div className={styles.card} style={{ height: '200px' }}>
                <Typography style={{ color: '#FCFCFC' }} variant='h6'>
                  {''}
                </Typography>
                <Counter
                  counterKey={counter.counterKey}
                  data={counter.data}
                  label={counter.label}
                  showDecimal={counter.showDecimal}
                />
              </div>
            ))}
          </Flex>
          <Flex
            childFlex='1 0 calc(50% - 60px)'
            justifyContent='center'
            gap='6px'
            mt='16px'
            wrap='wrap'
          >
            {section.charts.map((chart) => (
              <div
                className={styles.card}
                style={{ height: '450px', maxWidth: '50%' }}
              >
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
                  showDecimals={chart.showDecimals}
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
      ))}
    </div>
  );
}

export default App;
