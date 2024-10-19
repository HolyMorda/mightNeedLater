import { createContext, useContext, useState } from "react";
import { themes } from "../constants/themesData";
import { preferencesStorage } from "../db/Storage";

// check is it loading light theme after cold boot or data deletion (mb whith button for deletion from db)
// or i will remove "||" becouse if it is not there it wil not === dark so it will be light .

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const identifyTheme = preferencesStorage.contains("preferedThemeName")
    ? preferencesStorage.getString("preferedThemeName")
    : "light";

  const preferedTheme = identifyTheme === "dark" ? themes.dark : themes.light;

  const [theme, setTheme] = useState(preferedTheme);

  // make like toggleLightTheme  , toggleDarkTheme etc , or like function with args .

  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
    theme === themes.light
      ? preferencesStorage.set("preferedThemeName", "dark")
      : preferencesStorage.set("preferedThemeName", "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
export const useTheme = () => useContext(ThemeContext);
