from typing import List

from src.domain.fish.dto import FishCreateDTO, FishGetDTO

from src.domain.group.model import Group
from src.domain.fish.model import Fish
from src.domain.fish.dto import FishParametersLimitsDTO, ParameterLimitDTO


class FishDAO:
    async def get_ids(
        self,
    ) -> set[str]:
        group = await Group.find_one(
            Group.id == "0"
        )
        return set(fish.id for fish in group.fishes)

    async def create(
            self,
            data: List[FishCreateDTO],
    ) -> List[FishGetDTO]:
        groups = await Group.find_all().to_list()
        groups_map = {
            group.id: group
            for group in groups
        }
        fishes = []
        for item in data:
            group = groups_map.get(item.group_id)
            fish = Fish.model_validate(item)
            group.fishes.append(fish)
            fishes.append(
                FishGetDTO(
                    id=fish.id,
                    weight=fish.weight,
                    length=fish.length,
                    height=fish.height,
                    thickness=fish.thickness,
                    eggs_weight=fish.eggs_weight,
                    egg_weight=fish.egg_weight,

                    father_id=fish.father_id,
                    mother_id=fish.mother_id,

                    breed=group.breed,
                    sex=group.sex,
                )
            )
            await group.save()
        return fishes

    async def get_list(
            self,
            group_id: str | None,
    ) -> List[FishGetDTO]:
        if group_id is None:
            return [
                FishGetDTO(
                    id=fish.id,
                    weight=fish.weight,
                    length=fish.length,
                    height=fish.height,
                    thickness=fish.thickness,
                    eggs_weight=fish.eggs_weight,
                    egg_weight=fish.egg_weight,

                    father_id=fish.father_id,
                    mother_id=fish.mother_id,

                    breed=group.breed,
                    sex=group.sex,
                )
                for group in await Group.find_all().to_list() for fish in group.fishes
            ]
        else:
            group = await Group.find_one(Group.id == group_id)
            if group is None:
                return []
            return [
                FishGetDTO(
                    id=fish.id,
                    weight=fish.weight,
                    length=fish.length,
                    height=fish.height,
                    thickness=fish.thickness,
                    eggs_weight=fish.eggs_weight,
                    egg_weight=fish.egg_weight,

                    father_id=fish.father_id,
                    mother_id=fish.mother_id,

                    breed=group.breed,
                    sex=group.sex,
                )
                for fish in group.fishes
            ]


    async def get_parameters_limits(self) -> FishParametersLimitsDTO | None:
        groups = await Group.find().to_list()
        fishes = [fish for group in groups for fish in group.fishes]
        if len(fishes) == 0:
            return FishParametersLimitsDTO(
                height=ParameterLimitDTO(
                    min=0,
                    max=10
                ),
                weight=ParameterLimitDTO(
                    min=1,
                    max=5
                ),
                length=ParameterLimitDTO(
                    min=7,
                    max=17
                ),
                thickness=ParameterLimitDTO(
                    min=2,
                    max=3
                ),
                eggs_weight=ParameterLimitDTO(
                    min=1000,
                    max=2000
                ),
                egg_weight=ParameterLimitDTO(
                    min=70,
                    max=100
                )
            )

        def get_average(field: str) -> ParameterLimitDTO:
            field_values = [
                fish.__getattribute__(field)
                for fish in fishes
                if fish.__getattribute__(field) not in [0, None]
            ]
            if len(field_values) == 0:
                field_limits = ParameterLimitDTO(
                    min=None,
                    max=None
                )
            else:
                average_value = sum(field_values) / len(field_values)
                field_limits = ParameterLimitDTO(
                    min=average_value * 0.5,
                    max=average_value * 2
                )
            return field_limits

        height = get_average('height')
        weight = get_average('weight')
        length = get_average('length')
        thickness = get_average('thickness')
        eggs_weight = get_average('eggs_weight')
        egg_weight = get_average('egg_weight')

        return FishParametersLimitsDTO(
            height=height,
            weight=weight,
            length=length,
            thickness=thickness,
            eggs_weight=eggs_weight,
            egg_weight=egg_weight
        )

    async def get_by_id(self, group_id: str, fish_id: str) -> Fish | None:
        group = await Group.find_one(Group.id == group_id)
        if not group:
            return None
        return next(
            (fish for fish in group.fishes if fish.id == fish_id),
            None
        )

    async def get_by_fish_id(self, fish_id: str) -> str | None:
        groups = await Group.find_all().to_list()
        for group in groups:
            for fish in group.fishes:
                if fish.id == fish_id:
                    return fish_id
