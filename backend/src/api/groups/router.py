from typing import List

from fastapi import APIRouter, status, Body, Query

from src.domain.group.dto import GroupCreateDTO, GroupOrdersDTO, GroupGetDTO
from src.domain.group.service import create_group, get_groups

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



@groups_rest_v1.put(
    path='',
    status_code=status.HTTP_200_OK,
    response_model=List[GroupGetDTO],
)
async def get_groups_endpoint(
        page: int = Query(1, ge=1),
        size: int = Query(100, ge=1, le=1000),
        orders: List[GroupOrdersDTO] = Body(...),
) -> List[GroupGetDTO]:
    return await get_groups(page, size, orders)