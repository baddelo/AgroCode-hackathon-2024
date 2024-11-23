from src.domain.group.dto import GroupCreateDTO
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