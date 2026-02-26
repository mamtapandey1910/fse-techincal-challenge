"use client";

import type {Entity} from "@/lib/api";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface Props {
  entities: Entity[];
}

export function ContextCard({entities}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Context</CardTitle>
        <CardDescription>Recognized entities and relationships</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {entities.map((e, idx) => (
            <div
              key={idx}
              className="p-3 border rounded-md bg-white/50 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-gray-900 dark:text-white">
                  {e.name}
                </h4>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full capitalize bg-slate-100 text-slate-700 border border-slate-300">
                  {e.type}
                </span>
              </div>
              <p className="text-sm text-gray-900 dark:text-white mt-1">
                {e.sentiment_context}
              </p>
              {e.relationship && (
                <p className="text-xs text-gray-700 dark:text-gray-300 font-medium mt-2">
                  Relation: {e.relationship}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
