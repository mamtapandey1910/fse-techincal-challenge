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
        <CardTitle className="text-xl text-black dark:text-white font-bold">
          Emotion
        </CardTitle>
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
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Sentiment score bar — spectrum -1 to +1 */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-black dark:text-white">
                Sentiment score
              </span>
              <span className="text-gray-900 dark:text-white">
                {sentiment.score >= 0 ? "+" : ""}
                {sentiment.score.toFixed(2)}
              </span>
            </div>
            {/* Fixed spectrum: grey bar with colored thumb */}
            <div className="relative w-full h-3 rounded-full overflow-visible bg-gray-200 dark:bg-gray-700">
              {/* thumb */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow ${
                  sentiment.score > 0.1
                    ? "bg-green-500"
                    : sentiment.score < -0.1
                      ? "bg-rose-500"
                      : "bg-gray-400"
                }`}
                style={{
                  left: `calc(${((sentiment.score + 1) / 2) * 100}% - 8px)`,
                }}
              />
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-rose-400 font-medium">-1 Negative</span>
              <span className="text-gray-500 dark:text-gray-400 font-medium">
                0 Neutral
              </span>
              <span className="text-green-400 font-medium">+1 Positive</span>
            </div>
          </div>

          {/* Confidence bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="font-bold text-black dark:text-white">
                Confidence
              </span>
              <span className="text-gray-900 dark:text-white">
                {Math.round(sentiment.confidence * 100)} / 100
                {/* {Math.round(sentiment.confidence * 100)}%) */}
              </span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
              <div
                className="h-2 rounded-full bg-blue-500"
                style={{width: `${Math.round(sentiment.confidence * 100)}%`}}
              />
            </div>
          </div>

          {sentiment_breakdown && (
            <div className="mt-1 flex flex-wrap gap-2">
              {Object.entries(sentiment_breakdown).map(([k, v]) => (
                <div
                  key={k}
                  className="text-xs bg-muted px-2 py-1 rounded text-gray-900 dark:text-white"
                >
                  <span className="font-bold capitalize">{k}</span>:{" "}
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
