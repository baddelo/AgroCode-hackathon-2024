import io
from typing import List, Annotated

from fastapi import APIRouter, status, Body, Query, File
from starlette.responses import StreamingResponse, Response

from src.domain.excel.dal import read_group_from_excel, write_group_to_excel, write_generations_to_excel

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
    '/download/by-group',
)
async def download_excel(group_id: str) -> Response:
    headers = {
        'Content-Disposition': f'attachment; filename="Report_{group_id}.xlsx"'
    }
    file = await write_group_to_excel(group_id)
    return Response(
        file.getvalue(), headers=headers, media_type="application/octet-stream",
    )

@excel_rest_v1.get(
    '/download/generations',
)
async def download_generations_in_excel() -> Response:
    headers = {
        'Content-Disposition': f'attachment; filename="Pedigree.xlsx"'
    }
    file = await write_generations_to_excel()
    return Response(
        file.getvalue(), headers=headers, media_type="application/octet-stream",
    )