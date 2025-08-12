import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Platform, Alert } from 'react-native';
import { Button, Text } from 'react-native-paper';
import ViewShot from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';
import { useEditor } from '../context/EditorContext';
import { CardCanvas } from '../components/Canvas';
import ConfettiCannon from 'react-native-confetti-cannon';
import * as FileSystem from 'expo-file-system';

export default function PreviewScreen() {
  const { state } = useEditor();
  const viewShotRef = useRef<ViewShot>(null);
  const size = Math.min(Dimensions.get('window').width - 32, 340);
  const [hasPermission, requestPermission] = MediaLibrary.usePermissions();
  const [boom, setBoom] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setBoom(true), 400);
    return () => clearTimeout(timeout);
  }, []);

  const onSave = async () => {
    if (!hasPermission?.granted) {
      const { granted } = await requestPermission();
      if (!granted) return;
    }
    const uri = await viewShotRef.current?.capture?.({ result: 'tmpfile', fileName: 'birthday-card', format: 'png', quality: 1 });
    if (!uri) return;
    await MediaLibrary.saveToLibraryAsync(uri);
    Alert.alert('Saved', 'Your card has been saved to your gallery.');
  };

  const onShare = async () => {
    const uri = await viewShotRef.current?.capture?.({ result: 'tmpfile', fileName: 'birthday-card', format: 'png', quality: 1 });
    if (!uri) return;
    if (Platform.OS === 'web') {
      Alert.alert('Share', 'Sharing is not supported on web in this demo.');
      return;
    }
    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('Share', 'Sharing is not available on this device.');
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }} style={{ alignItems: 'center' }}>
        <CardCanvas state={state} width={size} height={size * 1.4} />
      </ViewShot>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 }}>
        <Button mode="outlined" onPress={onSave} style={{ flex: 1, marginRight: 8 }}>
          Save
        </Button>
        <Button mode="contained" onPress={onShare} style={{ flex: 1, marginLeft: 8 }}>
          Share
        </Button>
      </View>

      {boom && <ConfettiCannon count={150} origin={{ x: Dimensions.get('window').width / 2, y: 0 }} fadeOut={true} fallSpeed={3000} />}
    </View>
  );
}