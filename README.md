# FSE Technical Challenge

## Overview

You are building a reputation analysis tool for news articles. A user selects a news article about a person or company from a dropdown, reads it, and clicks Analyse. The backend calls an LLM to analyse the article and returns a structured reputation report. The frontend displays that report in a way that a reputation analyst can read and act on.

The frontend UI, article data, and API wiring are already built. Your job is to make the analysis work end to end.

---

## Setup

**Requirements:** Docker Desktop and an API key for an LLM provider (OpenAI or any other).

**1. Fork this repository to your own GitHub account and clone it**

```bash
git clone https://github.com/<your-username>/fse-techincal-challenge.git
cd fse-techincal-challenge
```

**2. Add your API key**

Open `.env.example`, copy it to `.env`, and set your key — see comments inside for details.

> **Please do not send us your API key.** We will use our own when reviewing your submission.

**Mac / Linux** — `make setup` handles the `.env` copy and image build in one step:
```bash
make setup   # creates .env and builds images
make start   # starts everything
```

**Windows**
```bash
cp .env.example .env   # then open .env and add your key
docker compose build
docker compose up
```

| Service   | URL                        |
|-----------|----------------------------|
| Frontend  | http://localhost:3000      |
| Backend   | http://localhost:8000      |
| API Docs  | http://localhost:8000/docs |

Hot module reloading is enabled — any changes to frontend or backend files reflect immediately without restarting.

---

## What to build

There are three tasks. The architecture and design decisions are entirely up to you.

### 1. Backend — `backend/app/routes/routes.py`

Implement `analyse_article()`. The article dict and LLM config are already provided:

- `article` — the full article object (`id`, `subject_name`, `subject_type`, `title`, `source`, `author`, `published_date`, `content`)
- `settings.openai_api_key` — your API key, loaded from `.env`
- `settings.openai_model` — model name, defaults to `gpt-4o-mini` (both from `app/config/config.py`)

The function should call an LLM and return an `AnalysisResponse` (defined in `app/models/responses.py`).

**Required fields:**
- `sentiment` — label, score (−1 to 1), confidence
- `entities` — key people/organisations, their relationship to the subject, sentiment context
- `themes` — 3–5 high-level themes present in the article
- `reputation_signals` — positive, negative, and neutral signals; each signal includes the signal itself and an evidence quote from the article so a reputation analyst can verify and cite it
- `significance_score` — 0 to 1 importance rating
- `reasoning` — plain-language explanation of the overall analysis

**Optional fields** (use if you have time — defined on the model):
- `sentiment_breakdown` — multi-dimensional scores e.g. `{"governance": -0.6, "business_performance": 0.8}`
- `mention_analysis` — how often the subject is mentioned and in what context
- `contradictions` — competing perspectives or framing inconsistencies; each includes a type, description, and evidence showing both frames
- `claims` — specific factual claims made about the subject, each with a supporting quote, claim type, and significance rating
- `source_credibility` — reliability and bias assessment of the publication

You are not limited to OpenAI. Use any provider or model you prefer — just update the client code and `.env` accordingly.

### 2. Frontend — `frontend/components/AnalysisResult.tsx`

Implement the result display component. The `result` prop is fully typed as `AnalysisResult` in `frontend/lib/api.ts`.

**What's already provided:**
- `AnalysisForm.tsx` — subject dropdown, article display (newspaper style), Analyse button, loading states, and error toasts. You do not need to touch this.
- `lib/api.ts` — `getArticles()`, `getArticle()`, `analyseArticle()` — all wired up.
- shadcn components: `Card`, `Badge`, `Button` — available at `@/components/ui/*`
- Once your backend works, `AnalysisResult` receives the response and renders below the article. Until then it shows a raw JSON block so you can see the shape.

The required fields will always be present. Optional fields may or may not exist — handle both cases gracefully.

### 3. Testing — `backend/data/articles.json`

Add your own test articles to `backend/data/articles.json`. They will appear automatically in the dropdown.

Follow the same format as the existing articles:

```json
{
  "id": "article-7",
  "subject_name": "Jane Smith",
  "subject_type": "person",
  "title": "Your article title",
  "source": "Publication Name",
  "author": "Author Name",
  "published_date": "2024-01-01",
  "content": "Full article text here..."
}
```

IDs must be unique. Cover a variety of sentiments — positive, mixed, and negative — to ensure your analysis is robust across different types of coverage.

---

## Useful commands (Mac / Linux)

```bash
make logs        # backend logs
make logs-fe     # frontend logs
make restart     # restart services
make clean       # full teardown including volumes
```

---

## What we look for

- **Does it work** — backend returns valid analysis, frontend presents it clearly
- **Analytical accuracy** — does the sentiment, signals, and reasoning actually reflect what the article says
- **Consistency** — does the analysis hold up across different articles and sentiment types, including your own test cases
- **Prompt quality** — is the LLM being asked the right questions in the right way
- **Code clarity** — is the code readable and sensibly structured
- **Frontend judgment** — would a reputation analyst understand the output at a glance
- **Robustness** — does it handle errors and edge cases gracefully
- **Reasoning** — can you explain the decisions you made

---

## Submission

1. Commit your work as you go — we look at commit history as part of the review
2. Fill in `docs/IMPLEMENTATION.md` — 5 questions, under 200 words total
3. Make sure your fork is set to **public**
4. Share your fork link with your interview coordinator
