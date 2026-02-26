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
  );
}
