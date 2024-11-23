import io
from typing import List, Annotated

from fastapi import APIRouter, status, Body, Query, File
from starlette.responses import StreamingResponse

from src.domain.excel.dal import read_group_from_excel

excel_rest_v1 = APIRouter(
    tags=["Excel"],
    prefix='/excel'
)


@excel_rest_v1.post(
    '/upload',
    status_code=status.HTTP_201_CREATED
)
async def upload_excel(
    file: Annotated[bytes, File()]
) -> None:
    file_bytes = io.BytesIO(file)
    await read_group_from_excel(file_bytes)
    return


@excel_rest_v1.get(
    '/download',
)
async def download_excel() -> StreamingResponse:
    with open('test.xlsx', 'rb') as f:
        headers = {
            'Content-Disposition': 'attachment; filename="name_of_excel_file.xls"',
        }
        return StreamingResponse(
            io.BytesIO(f.read()), headers=headers
        )