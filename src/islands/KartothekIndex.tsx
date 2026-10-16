/** Kartothek — the register as a card index you can actually work.
 *
 *  Built from free Arc UI items (uiarc.dev): command palette, chip group,
 *  segmented control, sortable data table, badge, slot text, text morph,
 *  dialog. Nothing here is decorative: every control answers a question a
 *  curator asks of an archive — which museum, which city, which year, where
 *  is the one I am thinking of.
 */
import { useCallback, useEffect, useMemo, useState } from "react";
import { CommandPalette, type CommandItem } from "../components/arc/command-palette/command-palette";
import { ChipGroup } from "../components/arc/chip-group/chip-group";
import SegmentedControl from "../components/arc/segmented-control/segmented-control";
import { SortableDataTable, type DataColumn } from "../components/arc/sortable-data-table/sortable-data-table";
import { Badge } from "../components/arc/badge/badge";
import { SlotText } from "../components/arc/slot-text/slot-text";
import { TextMorph } from "../components/arc/text-morph/text-morph";
import { Dialog, DialogContent } from "../components/arc/dialog/dialog";

export type Card = {
  nr: string;
  id: string;
  title: string;
  venue: string;
  year: number;
  city: string;
  type: string;
  role: string;
  cover: string;
  summary: string;
  shots: number;
};

interface Props {
  cards: Card[];
  /** Site base path, so links work under /studionoframe on Pages. */
  base: string;
}

const VIEWS = [
  { value: "register", label: "Register" },
  { value: "plates", label: "Plates" },
];

const unique = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

export default function KartothekIndex({ cards, base }: Props) {
  const [types, setTypes] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [view, setView] = useState("register");
  const [open, setOpen] = useState(false);
  const [held, setHeld] = useState<Card>(cards[cards.length - 1]);

  const typeOptions = useMemo(() => unique(cards.map((c) => c.type)).map((t) => ({ value: t, label: t })), [cards]);
  const cityOptions = useMemo(() => unique(cards.map((c) => c.city)).map((c) => ({ value: c, label: c })), [cards]);

  const shown = useMemo(
    () =>
      cards.filter(
        (c) => (!types.length || types.includes(c.type)) && (!cities.length || cities.includes(c.city)),
      ),
    [cards, types, cities],
  );

  /** What the filters currently say, in words, so the number above is never alone. */
  const reading = useMemo(() => {
    const parts = [types.length ? types.join(", ") : "every kind of room", cities.length ? cities.join(", ") : "every city"];
    return `${parts[0]} · ${parts[1]}`;
  }, [types, cities]);

  const href = useCallback((id: string) => `${base}/designs/kartothek/${id}`, [base]);
  const go = useCallback((id: string) => { window.location.href = href(id); }, [href]);

  // The palette is the fastest way through nineteen exhibitions: ⌘K, or "/" the
  // way a search field answers everywhere else.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const typing = event.target instanceof HTMLElement && (event.target.closest("input, textarea") !== null || event.target.isContentEditable);
      if ((event.key === "k" && (event.metaKey || event.ctrlKey)) || (event.key === "/" && !typing && !event.metaKey && !event.ctrlKey)) {
        event.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items: CommandItem[] = useMemo(
    () =>
      cards.map((c) => ({
        id: c.id,
        label: c.title,
        description: `${c.venue} · ${c.year}`,
        group: c.type,
        keywords: [c.city, c.nr, c.role, String(c.year)],
        shortcut: c.nr,
      })),
    [cards],
  );

  const columns: DataColumn<Card>[] = useMemo(
    () => [
      {
        key: "nr",
        label: "Nr",
        sortable: true,
        width: 68,
        render: (_value, row) => <span className="k-nr">{row.nr}</span>,
      },
      {
        key: "title",
        label: "Exhibition",
        sortable: true,
        render: (_value, row) => (
          <a
            className="k-link"
            href={href(row.id)}
            onPointerEnter={() => setHeld(row)}
            onFocus={() => setHeld(row)}
          >
            {row.title}
            <small>{row.venue}</small>
          </a>
        ),
      },
      { key: "year", label: "Year", sortable: true, numeric: true, width: 84 },
      { key: "city", label: "City", sortable: true, width: 150 },
      {
        key: "type",
        label: "Room",
        sortable: true,
        width: 150,
        // Arc's tones mean success, warning and danger; a kind of room is none
        // of those, so the badge stays neutral and the chips do the sorting.
        render: (_value, row) => <Badge size="sm">{row.type}</Badge>,
      },
      { key: "shots", label: "Plates", sortable: true, numeric: true, width: 88 },
    ],
    [href],
  );

  return (
    <div className="k-root">
      <div className="k-bar">
        <div className="k-count">
          <SlotText value={shown.length} />
          <span className="k-of">of {cards.length} exhibitions</span>
          <TextMorph as="p" className="k-reading">{reading}</TextMorph>
        </div>
        <div className="k-controls">
          <SegmentedControl options={VIEWS} value={view} onValueChange={setView} label="How the register is shown" />
          <button type="button" className="k-find" onClick={() => setOpen(true)}>
            Find an exhibition <kbd>⌘K</kbd>
          </button>
        </div>
      </div>

      <div className="k-filters">
        <ChipGroup options={typeOptions} value={types} onValueChange={setTypes} label="Kind of room" maxVisible={6} />
        <ChipGroup options={cityOptions} value={cities} onValueChange={setCities} label="City" maxVisible={5} />
      </div>

      {view === "register" ? (
        <div className="k-split">
          <div className="k-table">
            <SortableDataTable
              rows={shown}
              columns={columns}
              rowKey="id"
              caption="Every exhibition Studio No Frame has built, numbered from the first"
              emptyMessage="No exhibition matches those filters."
              defaultSort={{ key: "nr", direction: "desc" }}
              itemName={{ one: "exhibition", other: "exhibitions" }}
            />
          </div>
          <aside className="k-held">
            <figure>
              <img src={`${base}${held.cover}`} alt="" />
              <figcaption>
                <strong>{held.nr}</strong> {held.title}
                <span>{held.venue} · {held.year}</span>
                <span>{held.role} · {held.shots} plates</span>
                <p>{held.summary}</p>
              </figcaption>
            </figure>
          </aside>
        </div>
      ) : (
        <ul className="k-plates">
          {shown.map((c) => (
            <li key={c.id}>
              <a href={href(c.id)}>
                <img src={`${base}${c.cover}`} alt="" loading="lazy" decoding="async" />
                <span className="k-plate-nr">{c.nr}</span>
                <span className="k-plate-name">{c.title}</span>
                <span className="k-plate-where">{c.city} · {c.year}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent title="The register" description="Type a title, a city, a year or a number." className="k-palette">
          <CommandPalette
            items={items}
            placeholder="Vardiya, Venice, 2018, 016…"
            label="Exhibition register"
            autoFocus
            onSelect={(item) => go(item.id)}
            onClose={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
