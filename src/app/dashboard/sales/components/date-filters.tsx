"use client";

import { useState } from "react";

export default function DateFilter({
  onFilter,
}: {
  onFilter: (start: string, end: string) => void;
}) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onFilter(startDate, endDate);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-4">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Filter
      </button>
    </form>
  );
}
