import mongoose from 'mongoose';
const EquipoSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: [true, 'Requerido'],
  },
  code: {
    type: String,
    required: [true, 'Requerido'],
  },
  nombre: {
    type: String,
    required: [true, 'Requerido'],
  },
  confederacion: { type: String, required: [true, 'Confederación requerida'] },
  pos: { type: String, required: [true, 'POS required'] },
  rank: { type: Number, required: [true, 'FIFA Rank required'] },
});

export default mongoose.models.Equipo || mongoose.model('Equipo', EquipoSchema);
