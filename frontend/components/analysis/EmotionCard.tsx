"use client";

import type {AnalysisResult} from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface Props {
  sentiment: AnalysisResult["sentiment"];
  sentiment_breakdown?: AnalysisResult["sentiment_breakdown"];
}

export function EmotionCard({sentiment, sentiment_breakdown}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Emotion</CardTitle>
        <CardDescription className="flex items-center gap-3">
          <Badge
            variant={
              sentiment.label === "positive"
                ? "default"
                : sentiment.label === "negative"
                  ? "destructive"
                  : "secondary"
            }
            className={
              sentiment.label === "positive"
                ? "bg-green-600 text-white"
                : undefined
            }
          >
            {sentiment.label}
          </Badge>
          <span className="text-sm">Score: {sentiment.score}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
            <div
              className={`h-2 rounded-full ${sentiment.label === "positive" ? "bg-green-500" : sentiment.label === "negative" ? "bg-red-500" : "bg-yellow-400"}`}
              style={{
                width: `${Math.min(100, Math.round(Math.abs(sentiment.score) * 100))}%`,
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Confidence: {Math.round(sentiment.confidence * 100)}%
          </p>
          {sentiment_breakdown && (
            <div className="mt-3 flex flex-wrap gap-2">
              {Object.entries(sentiment_breakdown).map(([k, v]) => (
                <div key={k} className="text-xs bg-muted px-2 py-1 rounded">
                  <span className="font-medium capitalize">{k}</span>:{" "}
                  {Math.round((v as number) * 100)}%
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
