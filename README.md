# SentimentLens

Social media sentiment analysis using Logistic Regression, Naive Bayes, and ANN — served via FastAPI + Next.js.
[![Open PDF](https://img.shields.io/badge/Colab-PDF-F9AB00?logo=googlecolab&logoColor=white)](notebooks/models_development.ipynb%20-%20Colab.pdf)

## Stack
- **Frontend** — Next.js 14, Tailwind CSS
- **Backend** — FastAPI, scikit-learn, TensorFlow
- **Models** — versioned via `registry.json`, hot-swappable

## Project Structure
```
social-sentiment/
├── frontend/        # Next.js app
├── backend/         # FastAPI + ML layer
│   └── ml/
│       ├── registry.json       # model registry
│       ├── models/             # .pkl / .h5 files (not in git)
│       └── preprocessors/      # vectorizers (not in git)
└── docker-compose.yml
```

## Local Setup

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate        # Windows
pip install -r requirements.txt
python -c "import nltk; nltk.download('stopwords')"
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Backend → http://localhost:8000  
Frontend → http://localhost:3000  
API docs → http://localhost:8000/docs

## Model Registry

Models are declared in `backend/ml/registry.json`.  
To add a new model: drop the file in `ml/models/`, add an entry to the registry, restart the server.

| ID | Name | Type | Enabled |
|----|------|------|---------|
| log_reg_v1 | Logistic Regression | sklearn | ✅ |
| bayes_v1 | Naive Bayes | sklearn | ✅ |
| ann_baseline_v1 | ANN Baseline | keras | ✅ |
| ann_improved_v1 | ANN Improved | keras | ✅ |

Upcoming model -> ann_WE+LSTM

## Notebooks
## 📓 Notebooks

## 📓 Notebooks

| Notebook | View |
|----------|------|
| Model Development | [![Open PDF](https://img.shields.io/badge/Colab-PDF-F9AB00?logo=googlecolab&logoColor=white)](notebooks/models_development.ipynb%20-%20Colab.pdf) |
| Model Playground | [![Open PDF](https://img.shields.io/badge/Colab-PDF-F9AB00?logo=googlecolab&logoColor=white)](notebooks/models_playground.ipynb%20-%20Colab.pdf) |
| Model Improved | [![Open PDF](https://img.shields.io/badge/Colab-PDF-F9AB00?logo=googlecolab&logoColor=white)](https://github.com/David27322/SentimentLens/blob/main/notebooks/model_improved.ipynb%20-%20Colab.pdf) |


 ## Demo
 ### Dashboard
![Dashboard](assets/screenshots/dashboard.png)

### Compare page
![Compare Page](assets/screenshots/compare.png)

## 🐳 Docker Setup

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/) ≥ 24.0
- [Docker Compose](https://docs.docker.com/compose/install/) ≥ 2.0

### Quick start

# 1. Clone the repo
```bash
git clone https://github.com/David27322/SentimentLens.git
cd SentimentLens
```

# 2. Copy env file and fill in your values
```bash
cp .env.example .env
```

# 3. Build and start all services
```bash
docker compose up --build
```

The app will be available at http://localhost:3000

### Other commands

| Command | Description |
|---------|-------------|
| `docker compose up -d`      | Run in detached (background) mode |
| `docker compose down`       | Stop and remove containers        |
| `docker compose logs -f`    | Tail logs from all services       |
| `docker compose ps`         | List running services             |

> The `docker-compose.yml` and `Dockerfile` are already in the repo root.
