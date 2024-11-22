from typing import List

from pymongo import ASCENDING, DESCENDING

from src.domain.fish.dto import FishCreateDTO, OrdersDTO, FishGetDTO

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
            orders: List[OrdersDTO]
    ) -> List[FishGetDTO]:
        sort_criteria = []
        for order in orders:
            sort_direction = ASCENDING if order.direction == 'ASC' else DESCENDING
            sort_criteria.append((order.field, sort_direction))

        group = await Group.find_one(Group.id == 0)

        if not group:
            return []

        sorted_fishes = sorted(
            group.fishes,
            key=lambda fish: tuple(
                getattr(fish, order.field) or 0 for order in orders
            ),
            reverse=any(order.direction == 'DESC' for order in orders)
        )

        paginated_fishes = sorted_fishes[offset - 1:offset - 1 + limit]

        return [
            FishGetDTO(
                id=fish.id,
                weight=fish.weight,
                length=fish.length,
                thickness=fish.thickness,
                eggs_weight=fish.eggs_weight,
                egg_weight=fish.egg_weight
            ) for fish in paginated_fishes
        ]


