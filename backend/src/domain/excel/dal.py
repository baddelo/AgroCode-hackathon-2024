import io

from openpyxl import load_workbook

def read_excel(file: io.BytesIO):
    workbook = load_workbook(filename=file)
    sheet = workbook.active

    data = []
    for row in sheet.iter_rows(min_row=2, values_only=True):  # Начинаем с 2-й строки, чтобы пропустить заголовки
        data.append(row)

    return data