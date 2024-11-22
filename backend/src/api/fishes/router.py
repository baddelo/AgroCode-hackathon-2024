from typing import List

from fastapi import APIRouter, status, Body

from src.domain.fish.dto import FishCreateResponseDTO, FishCreateDTO, FishParametersLimitsDTO
from src.domain.fish.exception import FISH_ID_OVERLAP_EXCEPTION
from src.domain.fish.service import create_fishes, get_fishes_parameters_limits
from src.utils.docs_utils import build_exception_responses

fishes_rest_v1 = APIRouter(
    tags=["Fishes"],
    prefix='/fishes'
)


@fishes_rest_v1.post(
    path='',
    status_code=status.HTTP_201_CREATED,
    response_model=List[FishCreateResponseDTO],
    responses=build_exception_responses(
        FISH_ID_OVERLAP_EXCEPTION
    )
)
async def create_fishes_endpoint(
        body: List[FishCreateDTO] = Body(...)
) -> List[FishCreateResponseDTO]:
    return await create_fishes(body)


@fishes_rest_v1.get(
    path='/parameters-limits',
    status_code=status.HTTP_200_OK,
    response_model=FishParametersLimitsDTO,
)
async def get_fishes_parameters_limits_endpoint() -> List[FishCreateResponseDTO]:
    return await get_fishes_parameters_limits()
