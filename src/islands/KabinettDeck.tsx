/** Kabinett — the archive handed to you one exhibition at a time.
 *
 *  Arc UI card stack: the deck is the navigation. Flick a card left and the
 *  next exhibition comes up; flick it right (or press Open) and you walk into
 *  that room. The register beside it keeps the whole archive in view, marks
 *  where the deck has got to, and takes you straight to any room.
 */
import { useMemo, useState } from "react";
import CardStack from "../components/arc/card-stack/card-stack";
import SegmentedControl from "../components/arc/segmented-control/segmented-control";
import { SlotText } from "../components/arc/slot-text/slot-text";
import { Badge } from "../components/arc/badge/badge";

export type Room = {
  id: string;
  nr: string;
  title: string;
  venue: string;
  year: number;
  city: string;
  type: string;
  role: string;
  summary: string;
  cover: string;
  shots: number;
};

interface Props {
  rooms: Room[];
  base: string;
}

const MODES = [
  { value: "deck", label: "Deck" },
  { value: "wall", label: "Wall" },
];

export default function KabinettDeck({ rooms, base }: Props) {
  const [mode, setMode] = useState("deck");
  /** How far through the deck we are; the card stack has no cursor of its own. */
  const [cursor, setCursor] = useState(0);

  const href = (id: string) => `${base}/designs/kabinett/${id}`;

  /** Newest first: the deck hands you the most recent room on top. */
  const deck = useMemo(() => [...rooms].reverse(), [rooms]);
  const left = rooms.length - cursor;
  const plates = useMemo(() => rooms.reduce((n, r) => n + r.shots, 0), [rooms]);

  return (
    <div className="b-deck-root">
      <div className="b-deck-bar">
        <div className="b-left">
          <SlotText value={left} />
          <span>{left === 1 ? "room left in the deck" : "rooms left in the deck"}</span>
        </div>
        <SegmentedControl options={MODES} value={mode} onValueChange={setMode} label="How the archive is handed to you" />
      </div>

      {mode === "deck" ? (
        <div className="b-deal">
          <div className="b-stack">
            <CardStack
              items={deck}
              getKey={(room) => room.id}
              getLabel={(room) => room.title}
              label="Nineteen exhibitions"
              labels={{ left: "Next", right: "Open" }}
              outcomes={{ left: "passed", right: "opened" }}
              onDecide={(room, decision) => {
                setCursor((n) => Math.min(rooms.length, n + 1));
                if (decision === "right") window.location.href = href(room.id);
              }}
              onUndo={() => setCursor((n) => Math.max(0, n - 1))}
              onReset={() => setCursor(0)}
              renderEmpty={(reset) => (
                <div className="b-empty">
                  <p>That is the whole archive — {rooms.length} rooms, {plates} photographs.</p>
                  <button type="button" onClick={() => { reset(); setCursor(0); }}>Deal again</button>
                </div>
              )}
              renderCard={(room) => (
                <article className="b-card">
                  <img src={`${base}${room.cover}`} alt="" draggable={false} />
                  <div className="b-card-text">
                    <span className="b-card-nr">{room.nr}</span>
                    <h3>{room.title}</h3>
                    <p className="b-card-where">{room.venue} · {room.year}</p>
                    <p className="b-card-sum">{room.summary}</p>
                    <p className="b-card-tags">
                      <Badge size="sm">{room.type}</Badge>
                      <Badge size="sm">{room.city}</Badge>
                      <Badge size="sm">{room.shots} plates</Badge>
                    </p>
                  </div>
                </article>
              )}
            />
          </div>

          <ol className="b-running">
            {deck.map((room, i) => (
              <li key={room.id} data-state={i < cursor ? "seen" : i === cursor ? "now" : "ahead"}>
                <a href={href(room.id)}>
                  <span className="b-run-nr">{room.nr}</span>
                  <span className="b-run-name">{room.title}</span>
                  <span className="b-run-where">{room.city} · {room.year}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      ) : (
        <ul className="b-wall">
          {deck.map((room) => (
            <li key={room.id}>
              <a href={href(room.id)}>
                <img src={`${base}${room.cover}`} alt="" loading="lazy" decoding="async" />
                <span className="b-wall-nr">{room.nr}</span>
                <span className="b-wall-name">{room.title}</span>
                <span className="b-wall-where">{room.venue} · {room.year}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
