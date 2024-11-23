import io
import uuid

from openpyxl import load_workbook

from src.domain.fish.model import Fish
from src.domain.group.model import Group


async def read_group_from_excel(file: io.BytesIO):
    workbook = load_workbook(filename=file)
    sheet = workbook.active

    group = Group(breed='Лосось', sex='М', id='')
    for row in sheet.iter_rows(min_row=2, values_only=True):
        fish = Fish(
            id=row[0] if row[0] is not None else str(uuid.uuid4()),
            weight=row[1],
            length=row[2],
            height=row[3],
            thickness=row[4],
            eggs_weight=row[5],
            egg_weight=row[6],
        )
        if not group.id:
            group.id = row[7]
        group.fishes.append(fish)
    await group.save()
    return group