"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

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
      <CardContent className="space-y-5">
        {themes.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
              Themes
            </h4>
            <div className="flex flex-wrap gap-2">
              {themes.map((t, i) => (
                <span
                  key={i}
                  className="inline-block bg-indigo-600 dark:bg-indigo-500 text-white rounded-full px-4 py-1.5 text-sm font-bold shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
        <div>
          <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2">
            Reasoning
          </h4>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {reasoning}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
