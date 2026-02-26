"use client";

import type {AnalysisResult} from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import {Badge} from "./ui/badge";

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

export default function AnalysisResult({result}: Props) {
  return (
    <div className="space-y-4 font-poppins text-black dark:text-white">
      <h2 className="text-lg font-semibold">Analysis Result</h2>

      <div className="flex items-center gap-6">
        <div>
          <div className="text-2xl font-bold">
            {Math.round(result.significance_score * 100)}%
          </div>
          <div className="text-xs text-muted-foreground">Significance</div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              result.sentiment.label === "positive"
                ? "default"
                : result.sentiment.label === "negative"
                  ? "destructive"
                  : "secondary"
            }
            className={
              result.sentiment.label === "positive"
                ? "bg-green-600 text-white"
                : undefined
            }
          >
            {result.sentiment.label}
          </Badge>
          <div className="text-sm text-muted-foreground">Sentiment</div>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="font-medium">Reasoning</h4>
        <p className="mt-2 text-sm text-muted-foreground whitespace-pre-wrap">
          {result.reasoning}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
            <CardDescription className="flex items-center gap-3">
              <Badge
                variant={
                  result.sentiment.label === "positive"
                    ? "default"
                    : result.sentiment.label === "negative"
                      ? "destructive"
                      : "secondary"
                }
                className={
                  result.sentiment.label === "positive"
                    ? "bg-green-600 text-white"
                    : undefined
                }
              >
                {result.sentiment.label}
              </Badge>
              <span className="text-sm">Score: {result.sentiment.score}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                <div
                  className={`h-2 rounded-full ${result.sentiment.label === "positive" ? "bg-green-500" : result.sentiment.label === "negative" ? "bg-red-500" : "bg-yellow-400"}`}
                  style={{
                    width: `${Math.min(100, Math.round(result.sentiment.score * 100))}%`,
                  }}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Confidence: {Math.round(result.sentiment.confidence * 100)}%
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Entities</CardTitle>
            <CardDescription>Recognized entities and contexts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {result.entities.map((e, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded-md bg-white/50 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{e.name}</h4>
                    <Badge variant="outline">{e.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {e.sentiment_context}
                  </p>
                  {e.relationship && (
                    <p className="text-xs text-muted-foreground mt-2">
                      Relation: {e.relationship}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Themes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {result.themes.map((t, i) => (
                <Badge key={i} variant="ghost">
                  {t}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Reputation Signals</CardTitle>
            <CardDescription>
              Positive / Negative signals with evidence
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h4 className="font-medium mb-2">Positive</h4>
                {result.reputation_signals.positive.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    There are no positive signals.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {result.reputation_signals.positive.map((s, idx) => (
                      <div
                        key={idx}
                        className="rounded-md overflow-hidden border bg-white/60 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Badge
                            variant="default"
                            className="bg-green-600 text-white"
                          >
                            {s.signal}
                          </Badge>
                          <span className="text-sm text-black font-semibold truncate max-w-[18rem]">
                            {s.evidence}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground bg-green-50/30 p-2 rounded">
                          {s.evidence}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <h4 className="font-medium mb-2">Negative</h4>
                {result.reputation_signals.negative.length === 0 ? (
                  <div className="text-sm text-muted-foreground">
                    There are no negative signals.
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-3">
                    {result.reputation_signals.negative.map((s, idx) => (
                      <div
                        key={idx}
                        className="rounded-md overflow-hidden border bg-red-50/30 p-3"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="destructive">{s.signal}</Badge>
                          <span className="text-sm text-black font-semibold truncate max-w-[18rem]">
                            {s.evidence}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-black bg-red-50/20 p-2 rounded">
                          {s.evidence}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
