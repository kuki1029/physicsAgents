from pydantic import BaseModel, Field


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
