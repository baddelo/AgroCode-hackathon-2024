from typing import List, Literal

from src.domain.abc.dto import ABCDTO


class GroupDTO(ABCDTO):
    id: str
    breed: Literal['Лосось', 'Форель']
    sex: Literal['М', 'Ж']


class FishDTO(ABCDTO):
    id: str
    weight: float | None = None
    length: float | None = None
    height: float | None = None
    thickness: float | None = None
    eggs_weight: float | None = None
    egg_weight: float | None = None


class DataDTO(ABCDTO):
    # only fish or only group on single node
    fish: FishDTO | None = None
    group: GroupDTO | None = None

class NodeDTO(ABCDTO):
    id: int
    data: List[DataDTO]


class EdgeDTO(ABCDTO):
    id: int
    source: int
    target: int


class GenerationDTO(ABCDTO):
    nodes: List[NodeDTO]
    edges: List[EdgeDTO]
