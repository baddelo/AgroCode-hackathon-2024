import uuid

from pydantic import Field

from src.domain.abc.dto import ABCDTO


class FishCreateDTO(ABCDTO):
    id: str | None = Field(..., default_factory=lambda: str(uuid.uuid4()))
    weight: float | None = Field(None, ge=0)
    length: float | None = Field(None, ge=0)
    thickness: float | None = Field(None, ge=0)
    eggs_weight: float | None = Field(None, ge=0)
    egg_weight: float | None = Field(None, ge=0)


class FishCreateResponseDTO(ABCDTO):
    id: str
    weight: float | None = Field(None)
    length: float | None = Field(None)
    thickness: float | None = Field(None)
    eggs_weight: float | None = Field(None)
    egg_weight: float | None = Field(None)
