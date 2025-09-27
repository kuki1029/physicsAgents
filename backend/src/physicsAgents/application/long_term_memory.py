from physicsAgents.application.rag.retrievers import Retriever, get_retriever
from physicsAgents.application.rag.splitters import Splitter, get_splitter
from physicsAgents.settings import settings
from physicsAgents.domain.physicist import PhysicistExtract
from physicsAgents.infrastructure.mongo import MongoIndex, MongoClientWrapper
from physicsAgents.application.data import get_extraction_gen

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

    def __call__(self, physicists: list[PhysicistExtract]) -> None:
        if len(physicist) == 0:
            return

        with MongoClientWrapper(model=Document) as client:
            client.clear_collection()

        extraction_generator = get_extraction_gen(physicists)

        for _, docs in extraction_generator:
            chunked_docs = self.splitter.split_documents(docs)
            chunked_docs = deduplicate_do
