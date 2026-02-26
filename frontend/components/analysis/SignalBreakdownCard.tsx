"use client";

import type {ReputationSignals} from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {PieChart} from "./PieChart";

interface Props {
  reputation_signals: ReputationSignals;
}

export function SignalBreakdownCard({reputation_signals}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Signal Breakdown</CardTitle>
        <CardDescription>
          Positive, negative and neutral reputation signals
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PieChart
          slices={[
            {
              label: "Positive",
              count: reputation_signals.positive.length,
              color: "#16a34a",
            },
            {
              label: "Negative",
              count: reputation_signals.negative.length,
              color: "#dc2626",
            },
            {
              label: "Neutral",
              count: reputation_signals.neutral?.length ?? 0,
              color: "#9ca3af",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
}
