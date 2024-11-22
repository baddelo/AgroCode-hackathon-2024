from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter

from src.config.backend import BACKEND_CONFIG
from src.utils.routers_utils import include_routers


@asynccontextmanager
async def lifespan(app_: FastAPI):
    v1_routers = []
    v1_router = include_routers(APIRouter(prefix='/v1'), v1_routers)
    main_router = include_routers(APIRouter(prefix='/api'), (v1_router,))
    app_.include_router(main_router)
    yield


app = FastAPI(**BACKEND_CONFIG.init_kwargs(), lifespan=lifespan)