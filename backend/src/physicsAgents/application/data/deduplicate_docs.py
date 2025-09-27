import re
from typing import Tuple

from langchain_core.documents import Document

from datasketch import MinHash, MinHashLSH


def deduplicate_docs(docs: list[Document]) -> list[Document]:
    """
    Remove duplicate documents in a given list based on how similar they are

    Uses minHash algo to identify similar docs with threshold set to 0.7
    """

    if not docs:
        return []

    dupes = find_dupes(docs)

    remove_indices = set()
    for i, j, _ in dupes:
        # Keep whichever document has more content
        if len(docs[i].page_content) >= len(docs[j].page_content):
            remove_indices.add(j)
        else:
            remove_indices.add(i)

    return [doc for i, doc in enumerate(docs) if i not in remove_indices]


def find_dupes(docs: list[Document]) -> list[Tuple[int, int, float]]:
    """
    Find duplicates using MinHash. Create a signature for each doc and use locality sensitive hashing
    to find similar document pairs

    Returns tuple (doc1, doc2, similarity_score)
    """
    NUM_PERM = 128  # Higher number requires more computation and more accurate
    THRESHOLD = 0.7  # At what point to consider a document as similar

    minhashes = []

    for doc in docs:
        minhash = MinHash(num_perm=NUM_PERM)
        text = doc.page_content.lower()
        words = re.findall(r"\w+", text)

        # Create shingles (3-grams of words)
        for i in range(len(words) - 3):
            shingle = " ".join(words[i : i + 3])
            minhash.update(shingle.encode("utf-8"))
        minhashes.append(minhash)

    lsh = MinHashLSH(threshold=THRESHOLD, num_perm=NUM_PERM)

    for i, minhash in enumerate(minhashes):
        lsh.insert(i, minhash)

    dupes = []
    for i, minhash in enumerate(minhashes):
        similar_docs = lsh.query(minhash)
        similar_docs = [j for j in similar_docs if j != i]

        for j in similar_docs:
            similarity = minhashes[i].jaccard(minhashes[j])
            if similarity >= THRESHOLD:
                pair = tuple(sorted([i, j]))
                dupe_info = (*pair, similarity)
                if dupe_info not in dupes:
                    dupes.append(dupe_info)

    return dupes
