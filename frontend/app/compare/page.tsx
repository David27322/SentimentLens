"use client";

import { useState, useEffect } from "react";
import { getModels, predictAll, ModelInfo, PredictResponse } from "@/lib/api";
import TextInput from "@/components/analyze/TextInput";
import ResultCard from "@/components/analyze/ResultCard";

export default function ComparePage() {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [text, setText] = useState("");
  const [results, setResults] = useState<PredictResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getModels().then(setModels);
  }, []);

  async function handleSubmit() {
    if (!text.trim()) return;
    setLoading(true);
    setError("");
    setResults([]);
    try {
      const res = await predictAll(text, models);
      setResults(res);
    } catch {
      setError("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-black dark:text-white mb-1">Compare</h1>
        <p className="text-slate-500 text-sm">
          Run all models on the same input and see where they agree or differ.
        </p>
      </div>

      <div className="space-y-6">
        <TextInput
          text={text}
          onTextChange={setText}
          onSubmit={handleSubmit}
          loading={loading}
          showModelSelect={false}
        />

        {error && (
          <p className="text-sm text-red-500 px-1">{error}</p>
        )}

        {results.length > 0 && (
          <>
            {/* Agreement banner */}
            <AgreementBanner results={results} />

            {/* Result grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {results.map((r) => (
                <ResultCard
                  key={r.model_id}
                  result={r}
                  model={models.find((m) => m.id === r.model_id)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function AgreementBanner({ results }: { results: PredictResponse[] }) {
  const sentiments = results.map((r) => r.sentiment);
  const allAgree = sentiments.every((s) => s === sentiments[0]);
  const majority = sentiments.filter((s) => s === "positive").length >
    sentiments.length / 2
      ? "positive"
      : "negative";

  return (
    <div
      className={`rounded-xl px-5 py-4 flex items-center justify-between ${
        allAgree
          ? majority === "positive"
            ? "bg-emerald-50 border border-emerald-100"
            : "bg-red-50 border border-red-100"
          : "bg-amber-50 border border-amber-100"
      }`}
    >
      <div>
        <p className={`text-sm font-medium ${
          allAgree
            ? majority === "positive" ? "text-emerald-700" : "text-red-600"
            : "text-amber-700"
        }`}>
          {allAgree ? "All models agree" : "Models disagree"}
        </p>
        <p className={`text-xs mt-0.5 ${
          allAgree
            ? majority === "positive" ? "text-emerald-600" : "text-red-500"
            : "text-amber-600"
        }`}>
          {allAgree
            ? `Confident ${majority} prediction`
            : "Mixed signals — result may be ambiguous"}
        </p>
      </div>
      <span className={`text-xs font-medium px-3 py-1 rounded-full ${
        allAgree
          ? majority === "positive"
            ? "bg-emerald-100 text-emerald-700"
            : "bg-red-100 text-red-600"
          : "bg-amber-100 text-amber-700"
      }`}>
        {allAgree ? "Unanimous" : `${sentiments.filter(s => s === majority).length}/${results.length} ${majority}`}
      </span>
    </div>
  );
}