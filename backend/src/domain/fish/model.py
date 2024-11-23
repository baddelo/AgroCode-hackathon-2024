from src.domain.abc.dto import ABCDTO


class Fish(ABCDTO):
    id: str
    height: float | None
    weight: float | None
    length: float | None
    thickness: float | None
    eggs_weight:  float | None
    egg_weight: float | None

    father_id: str | None = None
    mother_id: str | None = None
