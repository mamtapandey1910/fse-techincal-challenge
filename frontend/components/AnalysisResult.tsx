"use client";

import type {AnalysisResult} from "@/lib/api";
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
    <div className="space-y-4 font-poppins text-black dark:text-white">
      <h2 className="text-lg font-semibold">Analysis Result</h2>

      {/* Signal breakdown pie chart */}
      {result.reputation_signals && (
        <SignalBreakdownCard reputation_signals={result.reputation_signals} />
      )}

      {result.significance_score != null && result.sentiment && (
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col items-center justify-center rounded-lg border p-5">
            <div className="flex items-baseline gap-1 text-3xl font-bold text-gray-900 dark:text-white">
              <span>{Math.round(result.significance_score * 100)}</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                /
              </span>
              <span>100</span>
            </div>
            <div className="text-sm font-bold text-gray-900 dark:text-white mt-1 tracking-wide uppercase">
              Significance
            </div>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg border p-5">
            <span
              className={`text-2xl font-bold capitalize px-4 py-1 rounded-full ${
                result.sentiment.label === "positive"
                  ? "bg-gradient-to-br from-green-400 to-emerald-600 text-white"
                  : result.sentiment.label === "negative"
                    ? "bg-gradient-to-br from-red-400 to-rose-600 text-white"
                    : "bg-gradient-to-br from-yellow-300 to-amber-500 text-gray-900"
              }`}
            >
              {result.sentiment.label}
            </span>
            <div className="text-sm font-bold text-gray-900 dark:text-white mt-2 tracking-wide uppercase">
              Sentiment
            </div>
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
