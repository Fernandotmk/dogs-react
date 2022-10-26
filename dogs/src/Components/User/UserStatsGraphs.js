import React from 'react';
import styles from './UserStatsGraphs.module.css';
import { VictoryPie, VictoryChart, VictoryBar } from 'victory';

const UserStatsGraphs = ({ data }) => {
  //foi utlizado array no graph pois a biblioteca externa
  //de graficos é criada baseada em um array de itens
  const [graph, setGraph] = React.useState([]);
  const [total, setTotal] = React.useState(0);

  let getAcesso = data.map(({ acessos }) => Number(acessos));

  React.useEffect(() => {
    const graphData = data.map((item) => {
      return {
        x: item.title,
        y: Number(item.acessos),
      };
    });

    //Caso nao tenha conteudo no data ele retorna o total como 0 (já colocado acima)
    //caso tenha ele faz o reduce para somar os valores dos acessos
    if (getAcesso.length > 0) setTotal(getAcesso.reduce((a, b) => a + b));
    setGraph(graphData);
  }, [data, getAcesso]);

  if (total <= 0 ) return <div>Não há acessos registrados.</div>
  return (
    <section className={`${styles.graph} animeLeft`}>
      <div className={`${styles.total} ${styles.graphItem}`}>
        <p>Acessos: {total}</p>
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryPie
          data={graph}
          innerRadius={50}
          padding={{ top: 20, bottom: 20, left: 80, right: 80 }}
          style={{
            data: {
              fillOpacity: 0.9,
              stroke: '#fff',
              strokeWidth: 2,
            },
            labels: {
              fontSize: 14,
              fill: '#333',
            },
          }}
        />
      </div>
      <div className={`${styles.graphItem}`}>
        <VictoryChart>
          <VictoryBar alignment='start' data={graph}></VictoryBar>
        </VictoryChart>
      </div>
    </section>
  );
};

export default UserStatsGraphs;
