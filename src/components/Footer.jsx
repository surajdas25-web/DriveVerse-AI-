import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} DriveVerse</span>
      <span>Built for the road ahead.</span>
      <Link to="/settings">Preferences</Link>
    </footer>
  );
}
