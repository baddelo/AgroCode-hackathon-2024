from typing import List, Literal

from beanie import Document, Link

from src.domain.fish.model import Fish


class Group(Document):
    id: str
    breed: Literal['Лосось', 'Форель']
    sex: Literal['М', 'Ж']
    fishes: List[Fish]
    father_group: Link['Group'] | None
    mother_group: Link['Group'] | None
