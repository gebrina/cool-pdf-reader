import { usePdfContext } from "../../context";
import { SettingsWrapper, Title } from "./Setting.style";

export const Setting = () => {
  const { theme } = usePdfContext();

  return (
    <SettingsWrapper className="settings" theme={theme}>
      <Title theme={theme}>Prefrences</Title>
    </SettingsWrapper>
  );
};
