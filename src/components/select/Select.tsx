import { FC } from "react";
import { ThemeName } from "../../common";
import { Option, SelectLabel, SelectWrapper } from "./Select.style";

export type TSelectOptions = {
  id: number;
  label: string;
  value: string;
  icon?: React.ReactNode;
};

type TSelectProps = {
  label: string;
  theme: ThemeName;
  selectOptions: TSelectOptions[];
  onSelect: (option: TSelectOptions) => void;
};

export const Select: FC<TSelectProps> = ({
  label,
  theme,
  selectOptions,
  onSelect,
}) => {
  const handleSelect = (optionId: number) => {
    const selectedOption = selectOptions.find((x) => x.id === optionId)!;
    onSelect(selectedOption);
  };

  return (
    <SelectWrapper theme={theme}>
      <SelectLabel theme={theme}>{label}</SelectLabel>
      {!!selectOptions.length &&
        selectOptions.map(({ id, label, value, icon }) => (
          <Option
            onClick={() => handleSelect(id)}
            selected={value === theme}
            key={label + id}
            theme={theme}
          >
            {icon && icon} {label}
          </Option>
        ))}
    </SelectWrapper>
  );
};
