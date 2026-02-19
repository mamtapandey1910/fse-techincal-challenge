"use client";

import type { AnalysisResult } from "@/lib/api";

interface Props {
  result: AnalysisResult;
}

// TODO: implement the results display
//
// `result` is whatever your POST /analyse/{id} endpoint returns.
// Since you define the response shape on the backend, you decide how to display it here.
//
// Suggestions:
// - Sentiment score with a visual indicator (colour, badge, progress bar)
// - Reputation signals grouped as positive / negative / neutral
// - Themes as badges
// - Key entities mentioned in the article
// - A reasoning or summary section
//
// shadcn components available: Card, Badge, Button — import from @/components/ui/*
// Raw result is rendered below so you can see the shape while building.

export default function AnalysisResult({ result }: Props) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Analysis Result</h2>
      <pre className="rounded-lg bg-muted p-4 text-xs overflow-auto whitespace-pre-wrap">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
}
