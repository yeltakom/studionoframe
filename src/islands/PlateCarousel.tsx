/** The plates of one exhibition, read one at a time: drag, flick, arrow keys.
 *  Arc UI carousel; the caption below is driven by the active slide, so the
 *  credit always belongs to the photograph you are looking at. */
import { useState } from "react";
import Carousel from "../components/arc/carousel/carousel";

export type Plate = { src: string; text: string; credit: string };

interface Props {
  plates: Plate[];
  base: string;
  /** Accessible name, such as "Vardiya — plates". */
  label: string;
}

export default function PlateCarousel({ plates, base, label }: Props) {
  const [index, setIndex] = useState(0);
  const active = plates[index];

  return (
    <div className="plates">
      <Carousel
        label={label}
        index={index}
        onIndexChange={setIndex}
        slideSize="min(86cqw, 940px)"
        slideLabel={(i, count) => `Plate ${i + 1} of ${count}`}
      >
        {plates.map((plate) => (
          <figure key={plate.src} className="plate">
            <img src={`${base}${plate.src}`} alt={plate.text || ""} loading="lazy" decoding="async" draggable={false} />
          </figure>
        ))}
      </Carousel>
      <p className="plate-caption">
        <span className="plate-nr">{String(index + 1).padStart(2, "0")} / {String(plates.length).padStart(2, "0")}</span>
        {active?.text ? <span>{active.text}</span> : null}
        {active?.credit ? <small>{active.credit}</small> : null}
      </p>
    </div>
  );
}
