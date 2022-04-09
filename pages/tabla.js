import { Simple } from '../components/UI/Layout';
import dbConnect from '../lib/dbConnect';
import Equipo from '../models/Equipo';

export default function TablaPage({ equipos }) {
  console.log(equipos);
  return (
    <Simple>
      {equipos.map(({ id, code, nombre, rank }) => (
        <div key={id}>
          {nombre} - {rank}
        </div>
      ))}
    </Simple>
  );
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time
export const getServerSideProps = async () => {
  try {
    await dbConnect();
    const res = await Equipo.find({});
    const equipos = res.map((doc) => {
      const equipo = doc.toObject();
      equipo._id = `${equipo._id}`;
      return equipo;
    });
    return { props: { equipos } };
  } catch (error) {
    console.log(error);
  }
};
