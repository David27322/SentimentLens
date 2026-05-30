import { supabase } from "./supabase";
import { PredictResponse, ModelInfo } from "./api";

export interface HistoryEntry {
  id: string;
  user_id: string;
  input_text: string;
  cleaned_text: string;
  model_id: string;
  model_name: string;
  sentiment: "positive" | "negative";
  confidence: number;
  created_at: string;
}

export async function savePrediction(
  userId: string,
  inputText: string,
  result: PredictResponse,
  model: ModelInfo
): Promise<void> {
  await supabase.from("predictions").insert({
    user_id: userId,
    input_text: inputText,
    cleaned_text: result.cleaned_text,
    model_id: result.model_id,
    model_name: model.name,
    sentiment: result.sentiment,
    confidence: result.confidence,
  });
}

export async function getUserHistory(userId: string): Promise<HistoryEntry[]> {
  const { data, error } = await supabase
    .from("predictions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}