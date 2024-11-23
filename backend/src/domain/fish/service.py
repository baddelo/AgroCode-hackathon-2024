import os
import joblib
import pandas as pd
from typing import List

from src.domain.fish.dto import (
    FishCreateDTO,
    FishParametersLimitsDTO,
    FishGetDTO,
    OrdersDTO
)
from src.domain.fish.exception import FISH_ID_OVERLAP_EXCEPTION
from src.domain.fish.dal import FishDAO
from src.domain.group.dal import GroupDAO
from src.domain.group.exception import GROUP_NOT_FOUND_EXCEPTION


async def create_fishes(fishes_data: List[FishCreateDTO]) -> List[FishGetDTO]:
    for i, fish in enumerate(fishes_data):
        group = await GroupDAO().get_by_id(fish.group_id)
        if group is None:
            raise GROUP_NOT_FOUND_EXCEPTION

        fish_ = await FishDAO().get_by_id(fish.id, fish.group_id)
        if fish_ is not None:
            raise FISH_ID_OVERLAP_EXCEPTION

        mother = await FishDAO().get_by_id(fish.mother_id, fish.group_id)
        if mother is None:
            fishes_data[i].mother_id = None

        father = await FishDAO().get_by_id(fish.father_id, fish.group_id)
        if father is None:
            fishes_data[i].father_id = None

    fishes = await FishDAO().create(fishes_data)
    fishes = predict_fishes(fishes)
    return fishes


async def get_fishes_parameters_limits() -> FishParametersLimitsDTO:
    fishes_parameters_limits = await FishDAO().get_parameters_limits()
    return fishes_parameters_limits


async def get_fishes_list(group_id: str | None) -> List[FishGetDTO]:
    fishes = await FishDAO().get_list(group_id)
    fishes = predict_fishes(fishes)
    return fishes


def predict_fishes(fishes: List[FishGetDTO]) -> List[float]:
    forell_model = joblib.load(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../models/forell.pkl")))
    lossos_model = joblib.load(os.path.abspath(os.path.join(os.path.dirname(__file__), "../../../models/lossos.pkl")))

    for fish in fishes:
        if fish.breed == 'Форель':
            prob = forell_model.predict_proba(
                pd.DataFrame(
                    {
                        'body_weight': [fish.weight],
                        'smith_length': [fish.length],
                        'roe_weight': [fish.weight],
                        'roe_egg_weight': [fish.egg_weight],
                        'condition_factor': [fish.k_upit],
                        'roe_ratio_percent': [fish.dolya_icry],
                        'working_fecundity': [fish.work_plodovitost],
                        'relative_fecundity': [fish.otnosit_plodovitost],
                        'reproductive_index': [fish.index_reproduction]
                    }
                )
            )
        elif fish.breed == 'Лосось':
            prob = lossos_model.predict_proba(
                pd.DataFrame(
                    {
                        'body_weight': [fish.weight],
                        'smith_length': [fish.length],
                        'body_height': [fish.height],
                        'body_thickness': [fish.thickness],
                        'roe_weight': [fish.weight],
                        'roe_egg_weight': [fish.egg_weight],
                        'condition_factor': [fish.k_upit],
                        'thickness_index': [fish.i_tolsh],
                        'height_index': [fish.i_visots],
                        'roe_ratio_percent': [fish.dolya_icry],
                        'working_fecundity': [fish.work_plodovitost],
                        'relative_fecundity': [fish.otnosit_plodovitost],
                        'reproductive_index': [fish.index_reproduction]
                    }
                )
            )
        else:
            raise ValueError("Unknown breed (Лосось or Форель)")

        fish.predict_proba = prob[0, 1]
    return fishes
