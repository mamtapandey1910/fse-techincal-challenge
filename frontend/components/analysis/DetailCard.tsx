"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

interface Props {
  themes: string[];
  reasoning: string;
}

export function DetailCard({themes, reasoning}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Detail</CardTitle>
        <CardDescription>Themes and reasoning</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium mb-2">Themes</h4>
          <div className="flex flex-wrap gap-2">
            {themes.map((t, i) => (
              <Badge key={i} variant="ghost">
                {t}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-medium mb-1">Reasoning</h4>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {reasoning}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
