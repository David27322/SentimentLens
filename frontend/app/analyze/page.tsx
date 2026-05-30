"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { getModels, predict, ModelInfo, PredictResponse } from "@/lib/api";
import { savePrediction } from "@/lib/history";
import TextInput from "@/components/analyze/TextInput";
import ResultCard from "@/components/analyze/ResultCard";

export default function AnalyzePage() {
  const { user } = useUser();
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [text, setText] = useState("");
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getModels().then((data) => {
      setModels(data);
      if (data.length > 0) setSelectedModel(data[0].id);
    });
  }, []);

  async function handleSubmit() {
    if (!text.trim() || !selectedModel) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await predict(selectedModel, text);
      setResult(res);

      // save to history if signed in
      if (user) {
        const activeModel = models.find((m) => m.id === selectedModel)!;
        await savePrediction(user.id, text, res, activeModel);
      }
    } catch {
      setError("Something went wrong. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  const activeModel = models.find((m) => m.id === selectedModel);

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">Analyze</h1>
        <p className="text-slate-500 text-sm">
          Pick a model and enter any text to get a sentiment prediction.
        </p>
      </div>

      <div className="space-y-4">
        <TextInput
          text={text}
          onTextChange={setText}
          selectedModel={selectedModel}
          onModelChange={setSelectedModel}
          models={models}
          onSubmit={handleSubmit}
          loading={loading}
          showModelSelect={true}
        />

        {!user && (
          <p className="text-xs text-slate-400 px-1">
            Sign in to save your prediction history.
          </p>
        )}

        {error && <p className="text-sm text-red-500 px-1">{error}</p>}

        {result && <ResultCard result={result} model={activeModel} />}
      </div>
    </div>
  );
}