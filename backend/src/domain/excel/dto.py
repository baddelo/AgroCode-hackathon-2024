from src.domain.abc.dto import ABCDTO


class ExcelImportResultDTO(ABCDTO):
    correct_fish_count: int
    error_fish_count: int