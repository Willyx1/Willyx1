import React from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Text, Card } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEditor } from '../context/EditorContext';

const TEMPLATES = [
  { id: 'classic', colors: ['#FDE68A', '#F59E0B'], label: 'Classic' },
  { id: 'modern', colors: ['#8B5CF6', '#06B6D4'], label: 'Modern' },
  { id: 'cute', colors: ['#FBCFE8', '#F472B6'], label: 'Cute' },
  { id: 'luxury', colors: ['#0F172A', '#1F2937'], label: 'Luxury' },
  { id: 'playful', colors: ['#34D399', '#60A5FA'], label: 'Playful' },
];

export default function TemplatesScreen() {
  const router = useRouter();
  const { dispatch } = useEditor();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        numColumns={2}
        data={TEMPLATES}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12 }}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ flex: 1 }}
            onPress={() => {
              dispatch({ type: 'SET_TEMPLATE', templateId: item.id });
              router.push('/editor');
            }}
          >
            <Card style={{ flex: 1, borderRadius: 16, overflow: 'hidden' }}>
              <LinearGradient colors={item.colors} style={{ height: 140, alignItems: 'center', justifyContent: 'center' }}>
                <Text variant="titleMedium" style={{ color: 'white', fontFamily: 'Poppins_700Bold' }}>{item.label}</Text>
              </LinearGradient>
            </Card>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}