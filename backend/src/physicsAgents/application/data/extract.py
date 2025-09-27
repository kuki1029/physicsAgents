from physicsAgents.domain.physicist import Physicist, PhysicistExtract
from physicsAgents.domain.physicist_factory import PhysicistFactory

from typing import Generator
from langchain_core.documents import Document
from langchain_community.document_loaders import WikipediaLoader


def get_extraction_gen(
    physicists: list[PhysicistExtract],
) -> Generator[tuple[Physicist, list[Document]], None, None]:
    """
    Extract docs for list of physicist and yield one at a time
    """
    physicist_factory = PhysicistFactory()
    for physicist_extract in physicists:
        physicist = physicist_factory.get_physicist(physicist_extract.id)

        # Only wikipedia supported for now
        physicist_docs = extract_from_wiki(physicist)

        yield (physicist, physicist_docs)


def extract_from_wiki(physicist: Physicist) -> list[Document]:
    """
    Extract documents from wikipedia for a given physicist
    """
    loader = WikipediaLoader(
        query=physicist.name,
        lang="en",
        load_max_docs=1,
        doc_content_chars_max=1000000,
    )

    docs = loader.load()

    for doc in docs:
        doc.metadata["physicist_id"] = physicist.id
        docs.metadata["physicist_name"] = physicist.name

    return docs
