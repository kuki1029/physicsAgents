from langchain_text_splitters import RecursiveCharacterTextSplitter

Splitter = RecursiveCharacterTextSplitter


def get_splitter(chunk_size: int) -> Splitter:
    """
    Returns a text splitter with 15% overlap and same tokenzier as gpt-4
    """

    # Ensure 15% overlap with next chunk
    chunk_overlap = int(0.15 * chunk_size)

    # Same tokenizer used by gpt-4
    return Splitter.from_tiktoken_encoder(
        encoding_name="cl100k_base", chunk_size=chunk_size, chunk_overlap=chunk_overlap
    )
