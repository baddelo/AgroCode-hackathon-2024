from typing import List

from src.domain.fish.dto import FishCreateDTO

from src.domain.fish.model import Group
from src.domain.fish.model import Fish


class FishDAO:
    async def get_ids(
        self
    ) -> set[str]:
        group = await Group.find_one(
            Group.id == 0
        )
        return set(fish.id for fish in group.fishes)

    async def create(
        self,
        data: List[FishCreateDTO]
    ) -> List[Fish]:
        group = await Group.find_one(Group.id == 0)
        group.fishes.extend([Fish.model_validate(fish) for fish in data])
        await group.save()
        return group.fishes
