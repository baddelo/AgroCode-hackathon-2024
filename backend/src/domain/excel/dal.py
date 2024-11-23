import io
import uuid

from openpyxl import load_workbook
from pydantic import ValidationError

from src.domain.excel.dto import ExcelImportResultDTO
from src.domain.fish.model import Fish
from src.domain.group.model import Group


async def read_group_from_excel(file: io.BytesIO):
    workbook = load_workbook(filename=file)
    sheet = workbook.active

    group = Group(breed='Лосось', sex='М', id='', father_group=None, mother_group=None)
    correct_fish_count = 0
    error_fish_count = 0
    for row in sheet.iter_rows(min_row=2, values_only=True):
        try:
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
            correct_fish_count += 1
        except ValidationError as e:
            print(e)
            error_fish_count += 1
    await group.save()
    return ExcelImportResultDTO(
        correct_fish_count=correct_fish_count,
        error_fish_count=error_fish_count,
    )
