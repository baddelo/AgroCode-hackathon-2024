from beanie import init_beanie

from src.config.mongo import MONGO_CONFIG
from src.database.mongo.connection import client


async def init_models():
    await init_beanie(
        database=client.__getattr__(MONGO_CONFIG.db),
        document_models=[]
    )