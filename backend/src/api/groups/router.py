from fastapi import APIRouter, status, Body

from src.domain.group.dto import GroupCreateDTO
from src.domain.group.service import create_group

groups_rest_v1 = APIRouter(
    tags=["Groups"],
    prefix='/groups'
)


@groups_rest_v1.post(
    path='',
    status_code=status.HTTP_201_CREATED,
)
async def create_group_endpoint(
        body: GroupCreateDTO = Body(...)
):
    return await create_group(body)