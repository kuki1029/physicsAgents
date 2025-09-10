from langchain_huggingface import HuggingFaceEmbeddings


def get_hf_embedding_model(model_id: str, device: str) -> HuggingFaceEmbeddings:
    """
    Returns the HuggingFace embedding model instance

    Args:
        model_id (str): Id or name of HF model to use
        device (str): Either 'cpu' or 'cuda' or compute device to run model
    """
    return HuggingFaceEmbeddings(
        model_name=model_id,
        model_kwargs={"device": device, "trust_remote_code": True},
        encode_kwargs={"normalize_embeddings": False},
    )
