FROM ghcr.io/astral-sh/uv:python3.12-bookworm-slim

WORKDIR /app

COPY uv.lock pyproject.toml ./
RUN uv sync --frozen --no-cache

COPY src/physicsAgents physicsAgents/

CMD ["/app/.venv/bin/fastapi", "run", "physicsAgents/infrastructure/api.py", "--port", "8000", "--host", "0.0.0.0"]
