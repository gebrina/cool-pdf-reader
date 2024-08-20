import { FC, KeyboardEvent, useRef } from "react";
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
  const trackUpDownKeys = useRef(-1);

  const handleSelect = (optionId: number) => {
    const selectedOption = selectOptions.find((x) => x.id === optionId)!;
    onSelect(selectedOption);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const optionsContainer = event.target as HTMLElement;
    console.log("Kyes", event.key);
    const options = optionsContainer.querySelectorAll("div");
    if (event.key === "ArrowDown") {
      if (trackUpDownKeys.current === selectOptions.length - 1)
        trackUpDownKeys.current = 0;
      else ++trackUpDownKeys.current;
    } else if (event.key === "ArrowUp") {
      if (trackUpDownKeys.current > 0) --trackUpDownKeys.current;
      else trackUpDownKeys.current = selectOptions.length - 1;
    }

    options.forEach((_, index) => {
      if (index === trackUpDownKeys.current) {
        // Get selected option and call onSelect callback
        const selectedOption = selectOptions[index];
        onSelect(selectedOption);
        _.classList.add("active");
      } else _.classList.remove("active");
    });
  };

  return (
    <SelectWrapper onKeyDown={handleKeyDown} tabIndex={1} theme={theme}>
      <SelectLabel theme={theme}>{label}</SelectLabel>
      {!!selectOptions.length &&
        selectOptions.map(({ id, label, icon }) => (
          <Option
            onKeyDown={handleKeyDown}
            onClick={() => handleSelect(id)}
            selected={false}
            key={label + id}
            theme={theme}
          >
            {icon && icon} {label}
          </Option>
        ))}
    </SelectWrapper>
  );
};
