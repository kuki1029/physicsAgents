from langchain.tools.retriever import create_retriever_tool

from physicsAgents.application.rag.retrievers import get_retriever
from physicsAgents.settings import settings

retriever = get_retriever(embedding_model_id=settings.RAG_EMBEDDING_MODEL)

retriever_tool = create_retriever_tool(
    retriever,
    "retrieve_physicist_context",
    (
        "Use this tool to retrieve accurate background information about physicists. "
        "It covers their biography, major works, scientific contributions, theories, and "
        "historical context. Always call this tool whenever the user asks about a physicist’s "
        "life, research, or impact on physics."
    ),
)

tools = [retriever_tool]
