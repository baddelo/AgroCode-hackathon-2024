from typing import List

from src.domain.fish.dto import FishCreateDTO, FishCreateResponseDTO


async def create_fishes(fishes_data: List[FishCreateDTO]) -> List[FishCreateResponseDTO]:
    fishes = await FishDAL().create(fishes_data)
    return [
        FishCreateResponseDTO.model_validate(fish)
        for fish in fishes
    ]
