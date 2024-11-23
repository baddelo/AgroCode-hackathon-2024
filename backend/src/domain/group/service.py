import uuid

from src.domain.group.dto import GroupCreateDTO


async def create_group(group_data: GroupCreateDTO):
    father_group = await GroupDAO().get_by_id(group_data.father_group)
    if father_group is None:
        group_data.father_group = None

    mother_group = await GroupDAO().get_by_id(group_data.mother_group)
    if mother_group is None:
        group_data.mother_group = None

    group = await GroupDAO().get_by_id(group_data.id)
    if group is not None:
        group_data.id = str(uuid.uuid4())

    await GroupDAO().create(group_data)
