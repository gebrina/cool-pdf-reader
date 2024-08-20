import { FC, useState } from "react";

export type TSelectOptions = {
  id: number;
  label: string;
  value: string;
};

type TSelectProps = {
  selectOptions: TSelectOptions[];
  onSelect: (option: TSelectOptions) => void;
};

export const Select: FC<TSelectProps> = ({ selectOptions, onSelect }) => {
  const [options, setOptions] = useState(selectOptions);

  return;
};
