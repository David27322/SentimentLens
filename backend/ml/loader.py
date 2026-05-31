import json
import joblib
from pathlib import Path

ML_DIR = Path(__file__).parent
REGISTRY_PATH = ML_DIR / "registry.json"


def load_registry() -> list[dict]:
    with open(REGISTRY_PATH) as f:
        return json.load(f)["models"]


class ModelStore:
    def __init__(self):
        self._models: dict[str, object] = {}
        self._vectorizers: dict[str, object] = {}
        self._registry: list[dict] = []

    def load_all(self):
        self._registry = load_registry()

        for entry in self._registry:
            if not entry.get("enabled", True):
                print(f"⏭️  Skipping {entry['id']} (disabled)")
                continue

            model_path = ML_DIR / entry["file"]
            vec_path = ML_DIR / entry["vectorizer"]

            vec_key = entry["vectorizer"]
            if vec_key not in self._vectorizers:
                self._vectorizers[vec_key] = joblib.load(vec_path)

            if entry["type"] == "sklearn":
                self._models[entry["id"]] = joblib.load(model_path)
                print(f"✅ {entry['id']} loaded")

            elif entry["type"] == "keras":
                # skip at startup — load on first request instead
                print(f"⏳ {entry['id']} will load on first request")

        print(f"\n✅ {len(self._models)} sklearn models ready")

    def get(self, model_id: str):
        # lazy load keras models on first access
        if model_id not in self._models:
            entry = next((m for m in self._registry if m["id"] == model_id), None)
            if entry and entry["type"] == "keras" and entry.get("enabled", True):
                from tensorflow import keras
                model_path = ML_DIR / entry["file"]
                self._models[model_id] = keras.models.load_model(
                    model_path, compile=False
                )
                print(f"✅ {model_id} lazy loaded")
        return self._models.get(model_id)

    def get_vectorizer_for(self, model_id: str):
        entry = next((m for m in self._registry if m["id"] == model_id), None)
        if entry is None:
            return None
        # ensure vectorizer is loaded for lazy keras models
        vec_key = entry["vectorizer"]
        if vec_key not in self._vectorizers:
            vec_path = ML_DIR / entry["vectorizer"]
            self._vectorizers[vec_key] = joblib.load(vec_path)
        return self._vectorizers.get(vec_key)

    def registry(self) -> list[dict]:
        return [m for m in self._registry if m.get("enabled", True)]


store = ModelStore()