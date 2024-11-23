from typing import List

from src.domain.fish.dto import (
    FishCreateDTO,
    FishParametersLimitsDTO,
    FishGetDTO, OrdersDTO
)
from src.domain.fish.exception import FISH_ID_OVERLAP_EXCEPTION
from src.domain.fish.dal import FishDAO
from src.domain.group.dal import GroupDAO
from src.domain.group.exception import GROUP_NOT_FOUND_EXCEPTION


async def create_fishes(fishes_data: List[FishCreateDTO]) -> List[FishGetDTO]:
    for i, fish in enumerate(fishes_data):
        group = await GroupDAO().get_by_id(fish.group_id)
        if group is None:
            raise GROUP_NOT_FOUND_EXCEPTION

        fish_ = await FishDAO().get_by_id(fish.id, fish.group_id)
        if fish_ is not None:
            raise FISH_ID_OVERLAP_EXCEPTION

        mother = await FishDAO().get_by_id(fish.mother_id, fish.group_id)
        if mother is None:
            fishes_data[i].mother_id = None

        father = await FishDAO().get_by_id(fish.father_id, fish.group_id)
        if father is None:
            fishes_data[i].father_id = None

    fishes = await FishDAO().create(fishes_data)
    return [
        FishGetDTO.model_validate(fish)
        for fish in fishes
    ]


async def get_fishes_parameters_limits() -> FishParametersLimitsDTO:
    fishes_parameters_limits = await FishDAO().get_parameters_limits()
    return fishes_parameters_limits


async def get_fishes_list(page: int, size: int, group_id: str | None, orders: List[OrdersDTO]) -> List[FishGetDTO]:
    offset = (page - 1) * size
    limit = offset + size
    fishes = await FishDAO().get_list(offset, limit, group_id, orders)
    return [
        FishGetDTO.model_validate(fish)
        for fish in fishes
    ]

