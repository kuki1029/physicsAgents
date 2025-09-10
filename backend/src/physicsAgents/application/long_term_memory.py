from physicsAgents.application.rag.retrievers import Retriever, get_retriever
from physicsAgents.application.rag.splitters import Splitter, get_splitter
from physicsAgents.settings import settings

from langchain_core.documents import Document


class LongTermMemoryCreator:
    def __init__(self, retriever: Retriever, splitter: Splitter) -> None:
        self.retriever = retriever
        self.splitter = splitter

    @classmethod
    def build_from_settings(cls) -> "LongTermMemoryCreator":
        """
        Factory method to create a LongTermMemoryCreator using the global RAG settings.

        This looks up the embedding model, top_k, and device from the app's settings and returns a ready-to-use
        retriever instance.
        """
        retriever = get_retriever(
            embedding_model=settings.RAG_EMBEDDING_MODEL,
        )

        splitter = get_splitter()

        return cls(retriever, splitter)

    def __call__(self, query: str) -> list[Document]:
        return self.retriever.invoke(query)
