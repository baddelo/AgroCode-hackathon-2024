from contextlib import asynccontextmanager

from fastapi import FastAPI, APIRouter

from src.config.backend import BACKEND_CONFIG
from src.database.mongo.model import init_models
from src.utils.routers_utils import include_routers


@asynccontextmanager
async def lifespan(app_: FastAPI):
    await init_models()

    from src.api.fishes.router import fishes_rest_v1

    v1_routers = [
        fishes_rest_v1
    ]
    v1_router = include_routers(APIRouter(prefix='/v1'), v1_routers)
    main_router = include_routers(APIRouter(prefix='/api'), (v1_router,))
    app_.include_router(main_router)
    yield


app = FastAPI(**BACKEND_CONFIG.init_kwargs(), lifespan=lifespan)