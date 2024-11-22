from typing import Dict

from fastapi import HTTPException


def build_exception_responses(*exceptions: HTTPException) -> Dict:
    result = {}
    for exc in exceptions:
        if exc.status_code not in result:
            result[exc.status_code] = [exc.detail]
        else:
            result[exc.status_code].append(exc.detail)

    return {
        status_code: {
            'content': {
                'application/json': {
                    'examples': {
                        detail: {
                            'value': {'details': detail}
                        }
                        for detail in details
                    }
                }
            },
        }
        for status_code, details in result.items()
    }