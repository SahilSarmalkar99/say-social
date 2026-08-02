import { useState } from "react";
import { Code2, Plus, X } from "lucide-react";

export default function TechStackInput({ techStack, onChange }) {
  const [value, setValue] = useState("");

  const addTech = () => {
    const tech = value.trim();

    if (!tech) return;

    // Prevent duplicates
    if (techStack.some((item) => item.toLowerCase() === tech.toLowerCase())) {
      setValue("");
      return;
    }

    onChange([...techStack, tech]);

    setValue("");
  };

  const removeTech = (index) => {
    onChange(techStack.filter((_, i) => i !== index));
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}

      <div className="flex items-center gap-3 border-b px-6 py-5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
          <Code2 size={22} className="text-purple-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold">Tech Stack</h2>

          <p className="text-sm text-gray-500">Press Enter or click Add.</p>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-6 p-6">
        {/* Input */}

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={value}
            placeholder="React"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTech();
              }
            }}
            className="flex-1 rounded-xl border p-3 outline-none transition focus:border-black"
          />

          <button
            type="button"
            onClick={addTech}
            className="flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-white transition hover:bg-gray-800"
          >
            <Plus size={18} />
            Add
          </button>
        </div>

        {/* Chips */}

        {techStack.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {techStack.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2"
              >
                <span className="text-sm font-medium">{tech}</span>

                <button
                  type="button"
                  onClick={() => removeTech(index)}
                  className="rounded-full p-1 transition hover:bg-red-100 hover:text-red-600"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed py-8 text-center text-gray-400">
            No technologies added.
          </div>
        )}
      </div>
    </div>
  );
}
