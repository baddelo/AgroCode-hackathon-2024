from typing import List

from src.domain.fish.dto import (
    FishCreateDTO,
    FishParametersLimitsDTO,
    FishGetDTO,
    OrdersDTO
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

        fish_ = await FishDAO().get_by_fish_id(fish.id)
        if fish_ is not None:
            raise FISH_ID_OVERLAP_EXCEPTION

        mother = await FishDAO().get_by_fish_id(fish.mother_id)
        if mother is None:
            fishes_data[i].mother_id = None

        father = await FishDAO().get_by_fish_id(fish.father_id)
        if father is None:
            fishes_data[i].father_id = None

    fishes = await FishDAO().create(fishes_data)
    return fishes


async def get_fishes_parameters_limits() -> FishParametersLimitsDTO:
    fishes_parameters_limits = await FishDAO().get_parameters_limits()
    return fishes_parameters_limits


async def get_fishes_list(group_id: str | None) -> List[FishGetDTO]:
    fishes = await FishDAO().get_list(group_id)
    return fishes

