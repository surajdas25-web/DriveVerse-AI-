export default function PageHeader({
  eyebrow = "YOUR VEHICLE, CONNECTED",
  title,
  description,
  action,
}) {
  return (
    <header className="page-header">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </header>
  );
}
