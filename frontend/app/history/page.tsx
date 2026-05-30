"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SignInButton, Show } from "@clerk/nextjs";
import { getUserHistory, HistoryEntry } from "@/lib/history";
import SentimentBadge from "@/components/ui/SentimentBadge";

export default function HistoryPage() {
  const { user } = useUser();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUserHistory(user.id)
      .then(setHistory)
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="max-w-3xl mx-auto px-6 py-14">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-1">History</h1>
        <p className="text-slate-500 text-sm">
          Your past sentiment analyses.
        </p>
      </div>

      <Show when="signed-out">
        <div className="bg-white border border-dashed border-slate-200 rounded-xl px-6 py-16 text-center">
          <p className="text-slate-500 text-sm mb-4">
            Sign in to view your prediction history.
          </p>
          <SignInButton mode="modal">
            <button className="px-4 py-2 bg-violet-600 text-white text-sm font-medium rounded-lg hover:bg-violet-700 transition-colors">
              Sign in
            </button>
          </SignInButton>
        </div>
      </Show>

      <Show when="signed-in">
        {loading ? (
          <p className="text-sm text-slate-400">Loading...</p>
        ) : history.length === 0 ? (
          <div className="bg-white border border-dashed border-slate-200 rounded-xl px-6 py-16 text-center">
            <p className="text-slate-400 text-sm">
              No predictions yet — head to{" "}
              <a href="/analyze" className="text-violet-600 hover:underline">
                Analyze
              </a>{" "}
              to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((entry) => (
              <div
                key={entry.id}
                className="bg-white border border-slate-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-800 truncate">
                    {entry.input_text}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {entry.model_name} ·{" "}
                    {new Date(entry.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <SentimentBadge sentiment={entry.sentiment} />
                  <span className="text-sm font-medium text-slate-600">
                    {Math.round(entry.confidence * 100)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </Show>
    </div>
  );
}