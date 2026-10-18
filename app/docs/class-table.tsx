import type { ClassRow } from "@/resources/component-docs";

export const ClassTable = ({ rows }: { rows: ClassRow[] }) => (
  <div className="mt-6 overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr className="border-b border-neutral-200 text-neutral-500">
          <th className="py-2 pr-4 font-medium">Class</th>
          <th className="py-2 pr-4 font-medium">Type</th>
          <th className="py-2 font-medium"> </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr
            key={`${row.kind}-${row.name}`}
            className="border-b border-neutral-100"
          >
            <td className="py-2 pr-4 font-mono text-[13px] text-neutral-950">
              {row.name}
            </td>
            <td className="py-2 pr-4 text-neutral-500">{row.kind}</td>
            <td className="py-2 text-neutral-600">{row.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
