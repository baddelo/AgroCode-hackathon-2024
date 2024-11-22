import uuid
from typing import Literal

from pydantic import Field, field_validator

from src.domain.abc.dto import ABCDTO


class FishCreateDTO(ABCDTO):
    id: str | None = Field(...)
    height: float | None = Field(None, ge=0)
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
    height: float | None = Field(None)
    weight: float | None = Field(None)
    length: float | None = Field(None)
    thickness: float | None = Field(None)
    eggs_weight: float | None = Field(None)
    egg_weight: float | None = Field(None)


class ParameterLimitDTO(ABCDTO):
    min: float | None = Field(None)
    max: float | None = Field(None)


class FishParametersLimitsDTO(ABCDTO):
    height: ParameterLimitDTO
    weight: ParameterLimitDTO
    length: ParameterLimitDTO
    thickness: ParameterLimitDTO
    eggs_weight: ParameterLimitDTO
    egg_weight: ParameterLimitDTO


class FishGetDTO(ABCDTO):
    id: str = Field(...)
    height: float | None = Field(None)
    weight: float | None = Field(None)
    length: float | None = Field(None)
    thickness: float | None = Field(None)
    eggs_weight: float | None = Field(None)
    egg_weight: float | None = Field(None)


class FiltersDTO(ABCDTO):
    direction: Literal['ASC', 'DESC']
    field: Literal['weight', 'length', 'thickness', 'eggs_weight', 'egg_weight', 'height']
