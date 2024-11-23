import uuid
from typing import Literal, Self

from pydantic import Field, field_validator, model_validator

from src.domain.abc.dto import ABCDTO


class FishCreateDTO(ABCDTO):
    id: str | None = Field(...)
    height: float | None = Field(None, ge=0)
    weight: float | None = Field(None, ge=0)
    length: float | None = Field(None, ge=0)
    thickness: float | None = Field(None, ge=0)
    eggs_weight: float | None = Field(None, ge=0)
    egg_weight: float | None = Field(None, ge=0)
    group_id: str = Field(0)
    father_id: str | None = Field(None)
    mother_id: str | None = Field(None)

    @field_validator('id', mode='before')
    @classmethod
    def id_validator(cls, v: str | None) -> str:
        if v is None:
            return str(uuid.uuid4())
        return v

    @field_validator(
        'height',
        'weight',
        'length',
        'thickness',
        'eggs_weight',
        'egg_weight',
        mode='before'
    )
    @classmethod
    def parameter_validator(cls, v: float | None) -> float | None:
        if v is None or v == 0:
            return None
        else:
            return v


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
    weight: float | None = Field(None)
    length: float | None = Field(None)
    height: float | None = Field(None)
    thickness: float | None = Field(None)
    eggs_weight: float | None = Field(None)
    egg_weight: float | None = Field(None)

    k_upit: float | None = Field(None)
    i_tolsh: float | None = Field(None)
    i_visots: float | None = Field(None)
    dolya_icry: float | None = Field(None)
    work_plodovitost: float | None = Field(None)
    otnosit_plodovitost: float | None = Field(None)
    index_reproduction: float | None = Field(None)

    breed: str | None = Field(None)
    sex: str | None = Field(None)

    predict_proba: float | None = Field(None)

    @model_validator(mode='after')
    def after_validator(self) -> Self:
        if self.weight is not None and self.length is not None and self.length != 0:
            self.k_upit = round(self.weight / pow(self.length, 3) * 100, 4)

        if self.thickness is not None and self.length is not None and self.length != 0:
            self.i_tolsh = round(self.thickness / self.length * 100, 4)

        if self.height is not None and self.length is not None and self.length != 0:
            self.i_visots = round(self.height / self.length * 100, 4)

        if self.eggs_weight is not None and self.weight is not None and self.weight != 0:
            self.dolya_icry = round(self.eggs_weight / self.weight * 100, 4)

        if self.eggs_weight is not None and self.egg_weight is not None and self.egg_weight != 0:
            self.work_plodovitost = round(self.eggs_weight / self.egg_weight, 4)

        if self.work_plodovitost is not None and self.weight is not None and self.eggs_weight is not None:
            if ((self.weight - self.eggs_weight) / 1000) != 0:
                self.otnosit_plodovitost = round((self.work_plodovitost * 1000) / ((self.weight - self.eggs_weight) / 1000), 4)

        if self.eggs_weight is not None and self.weight is not None and self.eggs_weight is not None:
            if ((self.weight - self.eggs_weight) / 1000) != 0:
                self.index_reproduction = round(self.eggs_weight / ((self.weight - self.eggs_weight) / 1000), 4)

        return self


class OrdersDTO(ABCDTO):
    direction: Literal['ASC', 'DESC']
    field: Literal['weight', 'height', 'length', 'thickness', 'eggs_weight', 'egg_weight', 'height']
