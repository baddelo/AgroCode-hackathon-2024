import uuid
from typing import List

from src.domain.group.dal import GroupDAO
from src.domain.group.dto import GroupCreateDTO, GroupGetDTO
from src.domain.group.exception import MALE_ERROR, FEMALE_ERROR


async def create_group(group_data: GroupCreateDTO):
    father_group = await GroupDAO().get_by_id(group_data.father_group)
    if father_group is None:
        group_data.father_group = None

    if father_group.sex != 'М':
        raise MALE_ERROR

    mother_group = await GroupDAO().get_by_id(group_data.mother_group)
    if mother_group is None:
        group_data.mother_group = None

    if mother_group.sex != 'Ж':
        raise FEMALE_ERROR

    group = await GroupDAO().get_by_id(group_data.id)
    if group is not None:
        group_data.id = str(uuid.uuid4())

    await GroupDAO().create(group_data)


async def get_groups() -> List[GroupGetDTO]:
    groups = await GroupDAO().get_list()
    return groups
