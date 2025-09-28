from src.physicsAgents.domain.physicist import PhysicistExtract
from src.physicsAgents.application import LongTermMemoryCreator
from pathlib import Path


def main() -> None:
    """
    File to run the memory creator
    """
    META_FILE = Path("data/extraction_metadata.json")

    physicists = PhysicistExtract.from_json(META_FILE)

    memory_creator = LongTermMemoryCreator.build_from_settings()
    memory_creator(physicists)


if __name__ == "__main__":
    main()
