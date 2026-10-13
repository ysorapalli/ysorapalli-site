import { CropMark } from "./icons";

type Props = { variant: "book" | "sub"; children: React.ReactNode };

/** The paper page: shadowed card with a bookmark ribbon and crop marks. */
export default function PageCard({ variant, children }: Props) {
  const tall = variant === "book";
  return (
    <>
      <main id="main" className={`page page--${variant}`}>
        <svg
          aria-hidden="true"
          className="ribbon"
          width={tall ? 30 : 26}
          height={tall ? 132 : 64}
          viewBox={tall ? "0 0 30 132" : "0 0 26 64"}
        >
          <path d={tall ? "M0 0H30V132L15 118L0 132V0Z" : "M0 0H26V64L13 52L0 64V0Z"} />
        </svg>
        <CropMark className="cropmark--tl" />
        {tall && <CropMark className="cropmark--bl" />}
        <CropMark className="cropmark--br" />
        {children}
      </main>
      <div className="page-end" />
    </>
  );
}

export function RunningHead({ left, right }: { left: React.ReactNode; right: React.ReactNode }) {
  return (
    <div className="running-head">
      <span>{left}</span>
      <span>{right}</span>
    </div>
  );
}
