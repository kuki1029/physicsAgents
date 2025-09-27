from typing import Generic, Type, TypeVar

from pydantic import BaseModel
from pymongo import MongoClient, errors
from settings import settings

T = TypeVar("T", bound=BaseModel)


class MongoClientWrapper(Generic[T]):
    """
    Simple wrapper for MongoDB operations
    """

    def __init__(self, model: Type[T]):
        self.model = model

        try:
            self.client = MongoClient(settings.MONGO_URI, appname="physagents")
            self.client.admin.command("ping")
        except Exception as e:
            print(e)
            raise

        self.database = self.client[settings.MONGO_DB_NAME]
        self.collection = self.database[settings.MONGO_LONG_TERM_MEMORY_COLLECTION]

    def __enter__(self) -> "MongoClientWrapper":
        """
        Enable context manager support.
        """

        return self

    def clear_collection(self) -> None:
        """
        Remove all documents from the collection to avoid duplicate when we reingest
        """
        try:
            res = self.collection.delete_many({})
        except errors.PyMongoError as e:
            print(e)
            raise
