from fastapi import HTTPException, status

FISH_ID_OVERLAP_EXCEPTION = HTTPException(
    status_code=status.HTTP_409_CONFLICT,
    detail='ID рыбы уже существует, введите другое значение'
)