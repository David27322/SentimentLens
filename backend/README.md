---
title: Sentiment Lens Backend
emoji: 🎭
colorFrom: purple
colorTo: purple
sdk: docker
app_port: 7860
pinned: false
---

# Sentiment Lens — FastAPI Backend

Social media sentiment analysis API using Logistic Regression and Naive Bayes.

## Endpoints
- `GET /health` — health check
- `GET /api/models` — list available models
- `POST /api/predict` — run sentiment prediction