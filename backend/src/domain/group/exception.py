from fastapi import HTTPException, status

GROUP_NOT_FOUND_EXCEPTION = HTTPException(
    status_code=status.HTTP_404_NOT_FOUND,
    detail='Группа не найдена'
)

MALE_ERROR = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail='Отцовская группа должны ссылаться на мужскую группу'
)

FEMALE_ERROR = HTTPException(
    status_code=status.HTTP_400_BAD_REQUEST,
    detail='Материнская группа должна ссылаться на женскую группу'
)