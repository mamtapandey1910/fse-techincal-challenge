"use client";

import type { AnalysisResult } from "@/lib/api";

interface Props {
  result: AnalysisResult;
}

// TODO: implement the results display
//
// `result` is typed as AnalysisResult (see frontend/lib/api.ts).
// The required fields are always present. Optional fields may be undefined.
//
// Required:  sentiment, entities, themes, reputation_signals,
//            significance_score, reasoning
// Optional:  sentiment_breakdown, mention_analysis, contradictions,
//            claims, source_credibility
//
// shadcn components available: Card, Badge, Button — import from @/components/ui/*
//
// The raw JSON below is a fallback so you can see the shape while building.
// Replace it with your implementation.

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
