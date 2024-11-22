from typing import List

from fastapi import APIRouter, status, Body

from src.domain.fish.dto import FishCreateResponseDTO, FishCreateDTO
from src.domain.fish.service import create_fishes

fishes_rest_v1 = APIRouter(
    tags=["Fishes"],
    prefix='/fishes'
)


@fishes_rest_v1.post(
    path='',
    status_code=status.HTTP_201_CREATED,
    response_model=List[FishCreateResponseDTO],
)
async def create_fishes_endpoint(
        body: List[FishCreateDTO] = Body(...)
) -> List[FishCreateResponseDTO]:
    return await create_fishes(body)
