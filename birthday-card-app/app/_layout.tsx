import React from 'react';
import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme as DefaultLightTheme, MD3DarkTheme as DefaultDarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { useFonts as usePoppins, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useFonts as useLobster, Lobster_400Regular } from '@expo-google-fonts/lobster';
import { useFonts as usePacifico, Pacifico_400Regular } from '@expo-google-fonts/pacifico';
import { StatusBar } from 'expo-status-bar';

const lightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: '#7C3AED',
    secondary: '#06B6D4',
    tertiary: '#F59E0B',
  },
};

const darkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#A78BFA',
    secondary: '#22D3EE',
    tertiary: '#FBBF24',
  },
};

export default function RootLayout() {
  const scheme = useColorScheme();
  const [loadedPoppins] = usePoppins({ Poppins_400Regular, Poppins_700Bold });
  const [loadedLobster] = useLobster({ Lobster_400Regular });
  const [loadedPacifico] = usePacifico({ Pacifico_400Regular });

  const fontsLoaded = loadedPoppins && loadedLobster && loadedPacifico;
  if (!fontsLoaded) return null;

  return (
    <PaperProvider theme={scheme === 'dark' ? darkTheme : lightTheme}>
      <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Birthday Cards' }} />
        <Stack.Screen name="templates" options={{ title: 'Templates' }} />
        <Stack.Screen name="editor" options={{ title: 'Editor' }} />
        <Stack.Screen name="preview" options={{ title: 'Preview' }} />
        <Stack.Screen name="countdown" options={{ title: 'Countdown' }} />
      </Stack>
    </PaperProvider>
  );
}