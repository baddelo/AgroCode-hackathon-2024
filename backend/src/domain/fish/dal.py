from typing import List

from src.domain.fish.dto import FishCreateDTO, FiltersDTO, FishGetDTO

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

    async def get_list(
            self,
            offset: int,
            limit: int,
            orders: List[FiltersDTO]
    ) -> List[FishGetDTO]:
        group = await Group.find_all().to_list()
        print(f'{group = }')

