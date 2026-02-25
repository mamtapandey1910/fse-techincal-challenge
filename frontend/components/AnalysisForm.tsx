"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  type Article,
  type ArticleSummary,
  type AnalysisResult,
  analyseArticle,
  getArticle,
  getArticles,
} from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnalysisResultComponent from "@/components/AnalysisResult";

export default function AnalysisForm() {
  const [subjects, setSubjects] = useState<ArticleSummary[]>([]);
  const [selectedId, setSelectedId] = useState<string>("");
  const [article, setArticle] = useState<Article | null>(null);
  const [loadingArticle, setLoadingArticle] = useState(false);
  const [analysing, setAnalysing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    getArticles()
      .then(setSubjects)
      .catch(() =>
        toast.error("Failed to load subjects. Is the backend running?"),
      );
  }, []);

  async function handleSelect(id: string) {
    setSelectedId(id);
    setArticle(null);
    setResult(null);
    setLoadingArticle(true);
    try {
      const data = await getArticle(id);
      setArticle(data);
    } catch {
      toast.error("Failed to fetch article details.");
    } finally {
      setLoadingArticle(false);
    }
  }

  async function handleAnalyse() {
    if (!selectedId) return;
    setAnalysing(true);
    setResult(null);
    const toastId = toast.loading("Analysing article...");
    try {
      const data = await analyseArticle(selectedId);
      setResult(data);
      toast.success("Analysis complete", { id: toastId });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Analysis failed.", {
        id: toastId,
      });
    } finally {
      setAnalysing(false);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleAnalyse();
      }}
      className="space-y-8"
    >
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <Select onValueChange={handleSelect} value={selectedId}>
          <SelectTrigger className="w-64 bg-white border-slate-200 text-sm">
            <SelectValue placeholder="Select a subject..." />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                <span className="font-medium">{s.subject_name}</span>
                <span className="ml-2 text-xs text-muted-foreground capitalize">
                  · {s.subject_type}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          type="submit"
          disabled={!selectedId || analysing || loadingArticle}
          className="bg-blue-600 hover:bg-blue-700 text-white shrink-0 px-5"
        >
          {analysing ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Analysing
            </span>
          ) : (
            "Analyse"
          )}
        </Button>
      </div>

      {/* Loading skeleton */}
      {loadingArticle && (
        <div className="space-y-4 animate-pulse">
          <div className="h-3 bg-slate-100 rounded w-24" />
          <div className="h-7 bg-slate-100 rounded w-3/4" />
          <div className="h-7 bg-slate-100 rounded w-1/2" />
          <div className="h-3 bg-slate-100 rounded w-32 mt-1" />
          <div className="space-y-2 pt-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-3 bg-slate-100 rounded"
                style={{ width: `${85 + Math.random() * 15}%` }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Article */}
      {article && (
        <article>
          {/* Source label */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
              {article.source}
            </span>
            <span className="text-slate-200">·</span>
            <Badge
              variant="secondary"
              className="capitalize text-xs bg-slate-100 text-slate-500 border-0 font-normal"
            >
              {article.subject_type}
            </Badge>
          </div>

          {/* Headline */}
          <h2 className="text-2xl font-bold text-slate-900 leading-tight tracking-tight mb-3">
            {article.title}
          </h2>

          {/* Byline */}
          <div className="flex items-center gap-1 text-xs text-slate-400 mb-6 pb-6 border-b border-slate-100">
            <span>By</span>
            <span className="font-medium text-slate-600">{article.author}</span>
            <span className="text-slate-200 mx-1">·</span>
            <span>{article.published_date}</span>
            <span className="text-slate-200 mx-1">·</span>
            <span>
              {article.content.split(" ").length.toLocaleString()} words
            </span>
          </div>

          {/* Body */}
          <div className="space-y-5">
            {article.content.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-[15px] text-slate-700 leading-[1.8] font-serif"
              >
                {para}
              </p>
            ))}
          </div>
        </article>
      )}

      {/* Analysis result — candidate implements AnalysisResult.tsx */}
      {result && (
        <div className="pt-6 border-t border-slate-200">
          <AnalysisResultComponent result={result} />
        </div>
      )}
    </form>
  );
}
