import { BiBulb } from "react-icons/bi";
import { FiMoon, FiSun } from "react-icons/fi";
import { usePdfContext } from "../../context";
import {
  SettingsWrapper,
  ThemeButton,
  ThemeWrapper,
  Title,
} from "./Setting.style";

export const Setting = () => {
  const { theme, onChangeTheme } = usePdfContext();

  return (
    <SettingsWrapper className="settings" theme={theme}>
      <Title size={2.5} theme={theme}>
        Manage ur Preferences
      </Title>
      <ThemeWrapper>
        <Title theme={theme} size={1.5}>
          Select Theme
        </Title>
        <ThemeButton onClick={() => onChangeTheme("default")} theme="default">
          <BiBulb />
          Default
        </ThemeButton>
        <ThemeButton onClick={() => onChangeTheme("light")} theme="light">
          <FiSun />
          Light
        </ThemeButton>
        <ThemeButton onClick={() => onChangeTheme("dark")} theme="dark">
          <FiMoon />
          Dark
        </ThemeButton>
      </ThemeWrapper>
    </SettingsWrapper>
  );
};
