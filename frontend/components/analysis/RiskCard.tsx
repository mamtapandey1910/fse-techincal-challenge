"use client";

import type {ReputationSignal} from "@/lib/api";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface Props {
  signals: ReputationSignal[];
}

export default function RiskCard({signals}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk</CardTitle>
        <CardDescription>Negative reputation signals</CardDescription>
      </CardHeader>
      <CardContent>
        {signals.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No negative signals detected.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {signals.map((s, idx) => (
              <div
                key={idx}
                className="rounded-md overflow-hidden border bg-red-50/30 p-3"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="destructive">{s.signal}</Badge>
                </div>
                <div className="mt-2 text-sm text-black bg-red-50/20 p-2 rounded">
                  {s.evidence}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
