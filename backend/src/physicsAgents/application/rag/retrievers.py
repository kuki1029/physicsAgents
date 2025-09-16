from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_mongodb.retrievers import (
    MongoDBAtlasHybridSearchRetriever,
)

from physicsAgents.settings import settings

from .embeddings import get_hf_embedding_model

Retriever = MongoDBAtlasHybridSearchRetriever


def get_retriever(
    embedding_model_id: str, num_of_docs: int = 3, device: str = "cpu"
) -> Retriever:
    """
    Returns a hybrid search retriever with the specific embedding model

    Args:
        embedding_model (str): id or name for embedding model to use
        num_of_docs (int): Number of documnets to retrieve defaults to 3
        devices (str): Specify either cpu or cuda or device to run model on
    """
    embedding_model = get_hf_embedding_model(embedding_model_id, device)

    vector_store = MongoDBAtlasVectorSearch.from_connection_string(
        connection_string=settings.MONGO_URI,
        embedding=embedding_model,
        namespace=f"{settings.MONGO_DB_NAME}.{settings.MONGO_LONG_TERM_MEMORY_COLLECTION}",
        text_key="chunk",
        embedding_key="embedding",
        relevance_score_fn="dotProduct",
    )

    return MongoDBAtlasHybridSearchRetriever(
        vectorstore=vector_store,
        search_index_name="hybrid_search_index",
        top_k=num_of_docs,
        vector_penalty=50,
        fulltext_penalty=50,
    )
