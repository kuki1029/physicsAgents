from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    GROQ_API_KEY: str
    GROQ_LLM_MODEL: str = "llama-3.3-70b-versatile"
    GROQ_LLM_MODEL_CONTEXT_SUMMARY: str = "llama-3.1-8b-instant"


settings = Settings()
