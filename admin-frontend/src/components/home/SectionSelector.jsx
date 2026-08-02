import { HOME_SECTIONS } from "../../constants/homeSections";

export default function SectionSelector({ value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-semibold mb-2">Section</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border p-3 outline-none"
      >
        <option value="">Select Section</option>

        {HOME_SECTIONS.map((section) => (
          <option key={section.value} value={section.value}>
            {section.label}
          </option>
        ))}
      </select>
    </div>
  );
}
