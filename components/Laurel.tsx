const LEAF = "M0 0 C5 -6 15 -6 20 0 C15 6 5 6 0 0Z";

// [x, y, rotation, scale] for each leaf along the stem (generated from the stem's bezier).
const LEAVES: [number, number, number, number][] = [
  [50.1, 163.5, -180, 0.98], [50.1, 163.5, -104, 0.98],
  [37.5, 150.5, -165, 0.95], [37.5, 150.5, -89, 0.95],
  [28.0, 134.4, -152, 0.92], [28.0, 134.4, -76, 0.92],
  [21.9, 115.6, -141, 0.89], [21.9, 115.6, -65, 0.89],
  [19.0, 94.4, -131, 0.86], [19.0, 94.4, -55, 0.86],
  [19.5, 71.3, -123, 0.83], [19.5, 71.3, -47, 0.83],
  [23.5, 46.7, -115, 0.8], [23.5, 46.7, -39, 0.8],
  [31.0, 20.9, -108, 0.77], [31.0, 20.9, -32, 0.77],
  [36.0, 8.0, -67, 0.7],
];

/** One laurel branch; mirror with `flip` for the right side of the wreath. */
export default function Laurel({ flip = false }: { flip?: boolean }) {
  return (
    <svg aria-hidden="true" className={`laurel${flip ? " laurel--right" : ""}`} viewBox="-4 -4 76 182">
      <path d="M60 170 C16 146 6 80 36 8" fill="none" strokeWidth="1.6" strokeLinecap="round" />
      {LEAVES.map(([x, y, r, s], i) => (
        <path key={i} d={LEAF} stroke="none" transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} />
      ))}
    </svg>
  );
}
