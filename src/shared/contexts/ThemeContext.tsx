import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { Box } from '@mui/system';
import { ThemeProvider } from "@mui/material";
import { LightTheme, DarkTheme } from "./../themes";

interface IThemeContextData {
    themeName: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeConxtext = createContext({} as IThemeContextData);

export const useAppThemeContext = () => {
    return useContext(ThemeConxtext);
}

export const AppThemeProvider: React.FC = ({children}) => {
    const [themeName, setThemeName] = useState<'light'|'dark'>('light');

    const toggleTheme = useCallback(()=> {
            setThemeName(oldthemeName => oldthemeName === 'light' ? 'dark' : 'light')
    }, []);

    const theme = useMemo(()=> {
       return themeName === 'light' ? LightTheme : DarkTheme;
       
    }, [themeName])
    return (
      <ThemeConxtext.Provider value={{themeName, toggleTheme}}>
          <ThemeProvider theme={theme}>
              <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
              {children}
              </Box>
          </ThemeProvider>
         
      </ThemeConxtext.Provider>
    );
}