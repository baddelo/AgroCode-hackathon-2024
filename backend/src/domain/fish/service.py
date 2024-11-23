from typing import List

from src.domain.fish.dto import (
    FishCreateDTO,
    FishCreateResponseDTO,
    FishParametersLimitsDTO,
    FishGetDTO, OrdersDTO
)
from src.domain.fish.exception import FISH_ID_OVERLAP_EXCEPTION
from src.domain.fish.dal import FishDAO


async def create_fishes(fishes_data: List[FishCreateDTO]) -> List[FishCreateResponseDTO]:
    fishes_ids: set[str] = await FishDAO().get_ids()
    overlap_ids = fishes_ids.intersection({fish.id for fish in fishes_data})
    if len(overlap_ids) > 0:
        raise FISH_ID_OVERLAP_EXCEPTION

    fishes = await FishDAO().create(fishes_data)
    return [
        FishCreateResponseDTO.model_validate(fish)
        for fish in fishes
    ]


async def get_fishes_parameters_limits() -> FishParametersLimitsDTO:
    fishes_parameters_limits = await FishDAO().get_parameters_limits()
    return fishes_parameters_limits


async def get_fishes_list(page: int, size: int, orders: List[OrdersDTO]) -> List[FishGetDTO]:
    offset = (page - 1) * size
    limit = offset + size
    fishes = await FishDAO().get_list(offset, limit, orders)
    return [
        FishGetDTO.model_validate(fish)
        for fish in fishes
    ]
