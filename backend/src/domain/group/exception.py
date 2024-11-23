from fastapi import HTTPException, status

GROUP_NOT_FOUND_EXCEPTION = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Группа не найдена'
)
