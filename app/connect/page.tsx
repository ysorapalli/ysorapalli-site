import { permanentRedirect } from "next/navigation";

// The Connect page was folded into the book's Correspondence chapter.
// Kept as a redirect so any old /connect links still land in the right place.
export default function ConnectRedirect() {
  permanentRedirect("/#correspondence");
}
