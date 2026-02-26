"use client";

import type {AnalysisResult} from "@/lib/api";
import {Badge} from "./ui/badge";
import {SignalBreakdownCard} from "./analysis/SignalBreakdownCard";
import {EmotionCard} from "./analysis/EmotionCard";
import RiskCard from "./analysis/RiskCard";
import {EvidenceCard} from "./analysis/EvidenceCard";
import {ContextCard} from "./analysis/ContextCard";
import {DetailCard} from "./analysis/DetailCard";

interface Props {
  result: AnalysisResult;
}

export default function AnalysisResult({result}: Props) {
  return (
    <div className="space-y-6 font-poppins text-black dark:text-white">
      <h2 className="text-lg font-semibold">Analysis Result</h2>

      {/* Signal breakdown pie chart */}
      {result.reputation_signals && (
        <SignalBreakdownCard reputation_signals={result.reputation_signals} />
      )}

      {result.significance_score != null && result.sentiment && (
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
      )}

      {result.sentiment && (
        <EmotionCard
          sentiment={result.sentiment}
          sentiment_breakdown={result.sentiment_breakdown}
        />
      )}
      {result.reputation_signals?.negative && (
        <RiskCard signals={result.reputation_signals.negative} />
      )}

      {result.reputation_signals?.positive && (
        <EvidenceCard
          positiveSignals={result.reputation_signals.positive}
          claims={result.claims}
        />
      )}
      {result.entities?.length > 0 && (
        <ContextCard entities={result.entities} />
      )}
      {(result.themes || result.reasoning) && (
        <DetailCard
          themes={result.themes ?? []}
          reasoning={result.reasoning ?? ""}
        />
      )}
    </div>
  );
}
