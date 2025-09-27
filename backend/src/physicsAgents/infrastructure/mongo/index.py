from langchain_mongodb.index import create_fulltext_search_index
from physicsAgents.application.rag.retrievers import Retriever

from .client import MongoClientWrapper


class MongoIndex:
    def __init__(self, retriever: Retriever, mongo_client: MongoClientWrapper) -> None:
        self.retriever = retriever
        self.mongoDB = mongo_client

    def create(self, dimensions, is_hybrid=False) -> None:
        vector_store = self.retriever.vectorstore

        vector_store.create_vector_search_index(dimensions=dimensions)

        if is_hybrid:
            create_fulltext_search_index(
                collection=self.mongoDB.collection,
                field=vector_store._text_key,
                index_name=self.retriever.search_index_name,
            )
