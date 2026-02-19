from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.routes import router

app = FastAPI(
    title="Article Reputation Analyzer",
    description="FSE Technical Challenge — reputation analysis API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health() -> dict:
    return {"status": "ok", "service": "article-reputation-analyzer"}


app.include_router(router)
