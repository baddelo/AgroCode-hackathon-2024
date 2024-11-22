import uuid

from pydantic import Field, field_validator

from src.domain.abc.dto import ABCDTO


class FishCreateDTO(ABCDTO):
    id: str | None = Field(...)
    weight: float | None = Field(None, ge=0)
    length: float | None = Field(None, ge=0)
    thickness: float | None = Field(None, ge=0)
    eggs_weight: float | None = Field(None, ge=0)
    egg_weight: float | None = Field(None, ge=0)

    @field_validator('id')
    @classmethod
    def id_validator(cls, v: str | None) -> str:
        if v is None:
            return str(uuid.uuid4())
        return v


class FishCreateResponseDTO(ABCDTO):
    id: str = Field(...)
    weight: float | None = Field(None)
    length: float | None = Field(None)
    thickness: float | None = Field(None)
    eggs_weight: float | None = Field(None)
    egg_weight: float | None = Field(None)


class ParameterLimitDTO(ABCDTO):
    min: float | None = Field(None)
    max: float | None = Field(None)


class FishParametersLimitsDTO(ABCDTO):
    weight: ParameterLimitDTO
    length: ParameterLimitDTO
    thickness: ParameterLimitDTO
    eggs_weight: ParameterLimitDTO
    egg_weight: ParameterLimitDTO
