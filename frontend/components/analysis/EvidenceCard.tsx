"use client";

import type {ReputationSignal, Claim} from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface Props {
  positiveSignals: ReputationSignal[];
  claims?: Claim[];
}

export function EvidenceCard({positiveSignals, claims}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Evidence</CardTitle>
        <CardDescription>
          Positive signals and supporting claims
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {positiveSignals.length === 0 ? (
          <div className="text-sm text-gray-900 dark:text-white">
            No positive signals detected.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            {positiveSignals.map((s, idx) => (
              <div
                key={idx}
                className="rounded-md overflow-hidden border bg-white/60 p-3"
              >
                <div className="flex items-center gap-3">
                  <Badge variant="default" className="bg-green-600 text-white">
                    {s.signal}
                  </Badge>
                </div>
                <div className="mt-2 text-sm text-gray-900 dark:text-white bg-green-50/30 p-2 rounded">
                  {s.evidence}
                </div>
              </div>
            ))}
          </div>
        )}
        {claims && claims.length > 0 && (
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Claims
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {claims.map((c, idx) => (
                <div
                  key={idx}
                  className="p-3 border rounded-md bg-white/50 shadow-sm space-y-1"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant="outline" className="capitalize">
                      {c.claim_type}
                    </Badge>
                    <Badge
                      variant={
                        c.significance === "high"
                          ? "destructive"
                          : c.significance === "medium"
                            ? "secondary"
                            : "ghost"
                      }
                      className="capitalize"
                    >
                      {c.significance}
                    </Badge>
                  </div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {c.claim}
                  </p>
                  <p className="text-xs text-gray-700 dark:text-gray-300">
                    {c.evidence}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
