from pydantic import BaseModel, Field
from pathlib import Path
import json


class Physicist(BaseModel):
    """A class representing a physicist agent

    Args:
        id(str): Unique id for physicist
        name(str): Name for physicist
        style(str): Talking style of physicist
    """

    id: str = Field(description="Identifier for the physicist")
    name: str = Field(description="Name of physicist")
    style: str = Field(description="Physicist's talking style")

    def __str__(self) -> str:
        return f"Physicist(id={self.id}, name={self.name}, style={self.style})"


class PhysicistExtract(BaseModel):
    """
    Class for raw physicist data from external sources
    """

    id: str = Field()
    urls: list[str] = Field(description="List of url's with info on the physicist")

    @classmethod
    def from_json(cls, file: Path) -> list["PhysicistExtract"]:
        with open(file, "r") as f:
            physicist_data = json.load(f)

        return [cls(**physicist) for physicist in physicist_data]
