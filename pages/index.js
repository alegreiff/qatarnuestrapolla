import { useEffect, useState } from 'react';
import { TablaFechas } from '../components/Tablas/TablaFechas';
import { Simple } from '../components/UI/Layout';

import { sortBy } from 'lodash';
import { desarrollo, equipos, finalPartidos } from '../polla';
import { Button } from '@chakra-ui/react';
import dbConnect from '../lib/dbConnect';
import Equipo from '../models/Equipo';

export default function Home({ losteams }) {
  const [matches, setMatches] = useState(null);
  const [fase, setFase] = useState(1);
  //nuestrapolla
  //nU3stra4.poYA
  //zq8kVhJkAoH7WUfv
  useEffect(() => {
    let part = [];
    if (fase === 0) {
      part = finalPartidos.filter((p) => p.fase > 0);
    } else {
      part = finalPartidos.filter((p) => p.fase === fase);
    }

    part.map((p) => {
      const power = Math.round(equipoPower(+p.team1) + equipoPower(+p.team2));
      Number.isNaN(power) ? (p.power = 0) : (p.power = power);
      p.local = equipo(p.team1);
      p.visitante = equipo(p.team2);
      p.code_loc = equipoCode(p.team1);
      p.code_vis = equipoCode(p.team2);
    });
    part = sortBy(part, ['datte'], ['asc']);

    setMatches(part);
  }, [fase]);

  const equipoCode = (id) => {
    //console.log("AIDI", id);
    const eq = losteams.find((eq) => eq.id === id);

    return eq?.code;
  };

  const equipo = (id) => {
    //console.log("AIDI", id);
    const eq = losteams.find((eq) => eq.id === id);

    return eq?.nombre;
  };
  const equipoPower = (id) => {
    const eq = losteams.find((eq) => eq.id === id);
    return eq?.rank;
  };

  return (
    <Simple titulo='Calendario Nuestra Polla'>
      {!desarrollo && (
        <>
          <Button
            onClick={() => {
              setFase(2);
            }}
          >
            Octavos
          </Button>
          <Button
            onClick={() => {
              setFase(1);
            }}
          >
            Grupos
          </Button>
          <Button
            onClick={() => {
              setFase(0);
            }}
          >
            Todos
          </Button>
        </>
      )}
      {matches && <TablaFechas datos={matches} />}
    </Simple>
  );
}

export const getServerSideProps = async () => {
  try {
    await dbConnect();
    const res = await Equipo.find({});
    const equipos = res.map((doc) => {
      const equipo = doc.toObject();
      equipo._id = `${equipo._id}`;
      return equipo;
    });
    return { props: { losteams: equipos } };
  } catch (error) {
    console.log(error);
  }
};
