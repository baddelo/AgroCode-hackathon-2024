from typing import List

from pymongo import ASCENDING, DESCENDING

from src.domain.fish.dto import FishCreateDTO, OrdersDTO, FishGetDTO

from src.domain.fish.model import Group
from src.domain.fish.model import Fish
from src.domain.fish.dto import FishParametersLimitsDTO, ParameterLimitDTO


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

        paginated_fishes = sorted_fishes[(offset - 1) * limit:(offset - 1) * limit + limit]

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


    async def get_parameters_limits(self) -> FishParametersLimitsDTO | None:
        group = await Group.find_one(Group.id == 0)
        if len(group.fishes) == 0:
            return None
        average_height = sum(fish.height for fish in group.fishes) / len(group.fishes)
        average_weight = sum(fish.weight for fish in group.fishes) / len(group.fishes)
        average_length = sum(fish.length for fish in group.fishes) / len(group.fishes)
        average_thickness = sum(fish.thickness for fish in group.fishes) / len(group.fishes)
        average_eggs_weight = sum(fish.eggs_weight for fish in group.fishes) / len(group.fishes)
        average_egg_weight = sum(fish.egg_weight for fish in group.fishes) / len(group.fishes)
        return FishParametersLimitsDTO(
            height=ParameterLimitDTO(
                min=average_height*0.5,
                max=average_height*2
            ),
            weight=ParameterLimitDTO(
                min=average_weight*0.5,
                max=average_weight*2
            ),
            length=ParameterLimitDTO(
                min=average_length*0.5,
                max=average_length*2
            ),
            thickness=ParameterLimitDTO(
                min=average_thickness*0.5,
                max=average_thickness*2
            ),
            eggs_weight=ParameterLimitDTO(
                min=average_eggs_weight*0.5,
                max=average_eggs_weight*2
            ),
            egg_weight=ParameterLimitDTO(
                min=average_egg_weight*0.5,
                max=average_egg_weight*2
            )
        )