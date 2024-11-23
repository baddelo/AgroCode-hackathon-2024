import uuid
from typing import Literal

from pydantic import Field, field_validator

from src.domain.abc.dto import ABCDTO


class GroupCreateDTO(ABCDTO):
    id: str
    breed: Literal['Лосось', 'Форель']
    sex: Literal['М', 'Ж']
    father_group: str | None = Field(None)
    mother_group: str | None = Field(None)

    @field_validator('id')
    @classmethod
    def id_validator(cls, v: str | None) -> str:
        if v is None:
            return str(uuid.uuid4())
        return v


class GroupOrdersDTO(ABCDTO):
    direction: Literal['ASC', 'DESC']
    field: Literal['id', 'breed', 'sex']


class GroupGetDTO(ABCDTO):
    id: str = Field(..., validation_alias='_id')
    breed: str
    sex: str
    father_group: str | None = Field(None)
    mother_group: str | None = Field(None)
