/** Two frames of the same room, dragged against each other.
 *
 *  Arc UI image compare. Not a before-and-after claim: the labels name which
 *  plate each side is, so the divider is a way of reading two photographs of
 *  one installation at once rather than a story about what changed. */
import ImageCompare from "../components/arc/image-compare/image-compare";

interface Props {
  base: string;
  left: string;
  right: string;
  labels: [string, string];
  alt: string;
}

export default function RoomCompare({ base, left, right, labels, alt }: Props) {
  return (
    <ImageCompare
      before={<img src={`${base}${left}`} alt={`${alt} — ${labels[0]}`} draggable={false} />}
      after={<img src={`${base}${right}`} alt={`${alt} — ${labels[1]}`} draggable={false} />}
      labels={labels}
      label="Drag between the two plates"
      aspectRatio="3 / 2"
      className="b-compare"
    />
  );
}
