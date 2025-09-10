from pydantic_settings import BaseSettings, SettingsConfigDict
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        extra="ignore",
        env_file_encoding="utf-8",
    )

    GROQ_API_KEY: str
    GROQ_LLM_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_LLM_MODEL_CONTEXT_SUMMARY: str = "llama-3.1-8b-instant"

    MODE: str = "DEV"

    # MongoDB
    MONGO_DB_NAME: str = "physagents"
    MONGO_URI: str
    MONGO_STATE_CHECKPOINT: str = "physagent_state_checkpoints"
    MONGO_STATE_WRITES: str = "physagent_state_writes"
    MONGO_LONG_TERM_MEMORY_COLLECTION: str = "physagent_long_term_memory"

    # For RAG
    RAG_EMBEDDING_MODEL: str = "intfloat/multilingual-e5-small"


settings = Settings()
