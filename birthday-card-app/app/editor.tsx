import React, { useRef } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { TextInput, Button, Chip, Text, SegmentedButtons } from 'react-native-paper';
import { useEditor } from '../context/EditorContext';
import { CardCanvas } from '../components/Canvas';
import { useRouter } from 'expo-router';

const COLORS = ['#ffffff', '#000000', '#F59E0B', '#06B6D4', '#8B5CF6', '#EF4444', '#10B981'];
const EMOJIS = ['🎈', '🎉', '🎂', '✨', '🥳', '🎁', '💖', '🌟'];

export default function EditorScreen() {
  const { state, dispatch } = useEditor();
  const router = useRouter();
  const size = Math.min(Dimensions.get('window').width - 32, 340);

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <View style={{ alignItems: 'center' }}>
        <CardCanvas state={state} width={size} height={size * 1.4} />
      </View>

      <TextInput
        mode="outlined"
        label="Message"
        value={state.messageText}
        onChangeText={(t) => dispatch({ type: 'SET_TEXT', text: t })}
        style={{ marginTop: 16 }}
      />

      <Text style={{ marginTop: 16, marginBottom: 8 }}>Font</Text>
      <SegmentedButtons
        value={state.messageFontFamily}
        onValueChange={(v) => dispatch({ type: 'SET_FONT', font: v as any })}
        buttons={[
          { value: 'Poppins_700Bold', label: 'Poppins' },
          { value: 'Lobster_400Regular', label: 'Lobster' },
          { value: 'Pacifico_400Regular', label: 'Pacifico' },
        ]}
      />

      <Text style={{ marginTop: 16, marginBottom: 8 }}>Text color</Text>
      <View style={styles.rowWrap}>
        {COLORS.map((c) => (
          <Chip key={c} selected={state.messageColor === c} onPress={() => dispatch({ type: 'SET_COLOR', color: c })} style={{ marginRight: 8, marginBottom: 8 }}>
            <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: c, borderWidth: 1, borderColor: '#00000022' }} />
          </Chip>
        ))}
      </View>

      <Text style={{ marginTop: 16, marginBottom: 8 }}>Stickers</Text>
      <View style={styles.rowWrap}>
        {EMOJIS.map((e) => (
          <Chip key={e} onPress={() => dispatch({ type: 'ADD_STICKER', emoji: e })} style={{ marginRight: 8, marginBottom: 8 }}>
            {e}
          </Chip>
        ))}
      </View>

      <Button mode="contained" style={{ marginTop: 24 }} onPress={() => router.push('/preview')}>
        Preview & Share
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});