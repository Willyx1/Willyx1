import React from 'react';
import { View, StyleSheet, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Button, Text, SegmentedButtons } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { launchImageLibrary } from 'react-native-image-picker';
import { EditorProvider, useEditor } from '../context/EditorContext';

function HomeInner() {
  const router = useRouter();
  const { dispatch } = useEditor();

  const onPickImage = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Not supported', 'Image picker is not available on web in this demo. Please use a simulator/device.');
      return;
    }
    const result = await launchImageLibrary({ mediaType: 'photo', selectionLimit: 1 });
    if (result.assets && result.assets[0]?.uri) {
      dispatch({ type: 'SET_IMAGE', uri: result.assets[0].uri });
      router.push('/editor');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#8B5CF6', '#06B6D4']} style={StyleSheet.absoluteFill} />
      <View style={styles.centerBox}>
        <Text variant="headlineLarge" style={{ color: 'white', fontFamily: 'Poppins_700Bold' }}>🎈 Happy Birthday Cards</Text>
        <Text variant="titleMedium" style={{ color: 'white', opacity: 0.9, marginTop: 8 }}>Make something beautiful in seconds</Text>
        <Button mode="contained" onPress={() => router.push('/templates')} style={{ marginTop: 24 }} buttonColor="#F59E0B">
          Choose a Template
        </Button>
        <Button mode="outlined" onPress={onPickImage} style={{ marginTop: 12 }} textColor="#ffffff">
          Use My Photo
        </Button>
        <Button onPress={() => router.push('/countdown')} style={{ marginTop: 24 }}>
          Birthday Countdown
        </Button>
      </View>
    </View>
  );
}

export default function Home() {
  return (
    <EditorProvider>
      <HomeInner />
    </EditorProvider>
  );
}

const styles = StyleSheet.create({
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
});