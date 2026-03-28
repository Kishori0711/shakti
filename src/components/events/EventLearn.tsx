export default function EventLearn() {
  const items = [
    "How to identify a viable business idea",
    "Understanding your target market",
    "Basic financial planning",
    "Common mistakes to avoid",
  ];

  return (
    <div className="bg-white border border-border rounded-2xl p-5">
      <h3 className="font-semibold mb-3">What Youll Learn</h3>

      <ul className="space-y-2 text-sm">
        {items.map((item, i) => (
          <li key={i}>✔ {item}</li>
        ))}
      </ul>
    </div>
  );
}