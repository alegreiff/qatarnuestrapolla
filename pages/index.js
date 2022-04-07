import Head from "next/head";
import { useEffect, useState } from "react";
import { TablaFechas } from "../components/Tablas/TablaFechas";
import { Simple } from "../components/UI/Layout";

import { sortBy } from "lodash";
import { desarrollo, equipos, finalPartidos } from "../polla";
import { Button } from "@chakra-ui/react";

export default function Home() {
  const [matches, setMatches] = useState(null);
  const [fase, setFase] = useState(1);

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
    part = sortBy(part, ["datte"], ["asc"]);

    setMatches(part);
  }, [fase]);

  const equipoCode = (id) => {
    //console.log("AIDI", id);
    const eq = equipos.find((eq) => eq.id === id);

    return eq?.code;
  };

  const equipo = (id) => {
    //console.log("AIDI", id);
    const eq = equipos.find((eq) => eq.id === id);

    return eq?.nombre;
  };
  const equipoPower = (id) => {
    const eq = equipos.find((eq) => eq.id === id);
    return eq?.rank;
  };

  return (
    <Simple titulo="Calendario Nuestra Polla">
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
