import { getCatalogue } from '../../../lib/categories';
export const sentence = 'Studio No Frame designs exhibition architecture for contemporary art, architecture and research. Berlin.';
export async function works() {
  return (await getCatalogue('en')).filter((p) => p.data.cover).sort((a, b) => b.year - a.year || a.data.order - b.data.order);
}
