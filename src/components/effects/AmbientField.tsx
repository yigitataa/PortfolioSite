export function AmbientField({ mood = "cool" }: { mood?: "cool" | "neutral" }) {
  return (
    <div className="ambient-field" data-mood={mood} aria-hidden="true">
      <span className="ambient-field__a" />
      <span className="ambient-field__b" />
      <span className="ambient-field__line" />
    </div>
  );
}
