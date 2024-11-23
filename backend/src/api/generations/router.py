from fastapi import APIRouter, status

from src.domain.generation.dto import GenerationDTO
from src.domain.generation.service import get_generations

generations_rest_v1 = APIRouter(
    tags=["Generations"],
    prefix='/generations'
)


@generations_rest_v1.get(
    path='',
    status_code=status.HTTP_200_OK,
)
async def get_generations_endpoint(
) -> GenerationDTO:
    return await get_generations()