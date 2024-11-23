from typing import List

from pymongo import ASCENDING, DESCENDING

from src.domain.group.dto import GroupCreateDTO, GroupOrdersDTO, GroupGetDTO
from src.domain.group.model import Group


class GroupDAO:
    async def get_by_id(
        self,
        id: str
    ) -> Group | None:
        group = await Group.find_one(
            Group.id == id
        )
        return group

    async def create(
        self,
        data: GroupCreateDTO
    ) -> None:
        group = await Group.model_validate(data.model_dump())
        await group.save()

    async def get_list(
            self,
            offset: int,
            limit: int,
            orders: List[GroupOrdersDTO]
    ) -> List[GroupGetDTO]:
        sort_criteria = []
        for order in orders:
            sort_direction = ASCENDING if order.direction == 'ASC' else DESCENDING
            sort_criteria.append((order.field, sort_direction))

        groups = await Group.find_all().to_list()

        if not groups:
            return []

        sorted_groups = sorted(
            groups,
            key=lambda fish: tuple(
                getattr(fish, order.field) or 0 for order in orders
            ),
            reverse=any(order.direction == 'DESC' for order in orders)
        )

        paginated_groups = sorted_groups[offset:limit]

        return [
            GroupGetDTO(
                id=group.id,
                breed=group.breed,
                sex=group.sex,
                father_group=group.father_group,
                mother_group=group.mother_group
            )
            for group in paginated_groups
        ]