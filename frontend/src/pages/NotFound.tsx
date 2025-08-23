import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Seite nicht gefunden</h1>
      <Link to="/" className="underline">Zurück zur Startseite</Link>
    </div>
  );
}