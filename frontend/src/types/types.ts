export interface IFishLimit {
  height: {
    min: number;
    max: number;
  };
  weight: {
    min: number;
    max: number;
  };
  length: {
    min: number;
    max: number;
  };
  thickness: {
    min: number;
    max: number;
  };
  eggs_weight: {
    min: number;
    max: number;
  };
  egg_weight: {
    min: number;
    max: number;
  };
}

export interface IFishes {
  id: string | null;
  weight: number | null;
  length: number | null;
  height: number | null;
  thickness: number | null;
  eggs_weight: number | null;
  egg_weight: number | null;
  group_id: string | null;
  father_group: string | null;
  mother_group: string | null;
}

export interface IFormGroup {
  id: string | null;
  breed: 'Лосось' | 'Форель';
  sex: 'М' | 'Ж';
  father_group: string | null;
  mother_group: string | null;
}
