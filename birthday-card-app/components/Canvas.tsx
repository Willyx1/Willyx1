import React from 'react';
import { ImageBackground, View, Text, StyleSheet, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { EditorState } from '../context/EditorContext';

const TEMPLATE_MAP: Record<string, { colors: string[]; textAlign: 'center' | 'left' | 'right' }> = {
  classic: { colors: ['#FDE68A', '#F59E0B'], textAlign: 'center' },
  modern: { colors: ['#8B5CF6', '#06B6D4'], textAlign: 'center' },
  cute: { colors: ['#FBCFE8', '#F472B6'], textAlign: 'center' },
  luxury: { colors: ['#0F172A', '#1F2937'], textAlign: 'center' },
  playful: { colors: ['#34D399', '#60A5FA'], textAlign: 'center' },
};

export function CardCanvas({ state, width, height }: { state: EditorState; width: number; height: number }) {
  const content = (
    <View style={[styles.canvas, { width, height }]}>      
      {state.background?.type === 'template' ? (
        <LinearGradient colors={TEMPLATE_MAP[state.background.templateId]?.colors ?? ['#111827', '#1f2937']} style={StyleSheet.absoluteFill} />
      ) : state.background?.type === 'image' ? (
        <ImageBackground source={{ uri: state.background.uri }} resizeMode="cover" style={StyleSheet.absoluteFill} />
      ) : (
        <LinearGradient colors={['#7C3AED', '#06B6D4']} style={StyleSheet.absoluteFill} />
      )}

      <Text
        style={{
          color: state.messageColor,
          textAlign: 'center',
          fontSize: 36,
          paddingHorizontal: 16,
          fontFamily: state.messageFontFamily,
          textShadowColor: 'rgba(0,0,0,0.25)',
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 4,
        }}
      >
        {state.messageText}
      </Text>

      {state.stickers.map((s) => (
        <Text
          key={s.id}
          style={{
            position: 'absolute',
            left: s.x * width - 16,
            top: s.y * height - 16,
            fontSize: 32,
          }}
        >
          {s.emoji}
        </Text>
      ))}
    </View>
  );

  return content;
}

const styles = StyleSheet.create({
  canvas: {
    overflow: 'hidden',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});