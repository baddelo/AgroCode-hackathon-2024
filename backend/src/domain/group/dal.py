from typing import List

from src.domain.group.dto import GroupCreateDTO, GroupGetDTO
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
        group = Group.model_validate(data.model_dump())
        await group.save()

    async def get_list(self) -> List[GroupGetDTO]:
        groups = await Group.find_all().to_list()

        if not groups:
            return []

        return [
            GroupGetDTO.model_validate(group)
            for group in groups
        ]