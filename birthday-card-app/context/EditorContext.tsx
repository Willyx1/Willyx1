import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type StickerItem = {
  id: string;
  emoji: string;
  x: number; // 0..1 relative
  y: number; // 0..1 relative
};

export type BackgroundSpec =
  | { type: 'template'; templateId: string }
  | { type: 'image'; uri: string };

export type EditorState = {
  background: BackgroundSpec | null;
  messageText: string;
  messageColor: string;
  messageFontFamily: 'Poppins_700Bold' | 'Lobster_400Regular' | 'Pacifico_400Regular' | 'Poppins_400Regular';
  stickers: StickerItem[];
};

const initialState: EditorState = {
  background: null,
  messageText: 'Happy Birthday! 🎉',
  messageColor: '#ffffff',
  messageFontFamily: 'Poppins_700Bold',
  stickers: [],
};

export type EditorAction =
  | { type: 'SET_TEMPLATE'; templateId: string }
  | { type: 'SET_IMAGE'; uri: string }
  | { type: 'SET_TEXT'; text: string }
  | { type: 'SET_COLOR'; color: string }
  | { type: 'SET_FONT'; font: EditorState['messageFontFamily'] }
  | { type: 'ADD_STICKER'; emoji: string }
  | { type: 'CLEAR' };

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case 'SET_TEMPLATE':
      return { ...state, background: { type: 'template', templateId: action.templateId } };
    case 'SET_IMAGE':
      return { ...state, background: { type: 'image', uri: action.uri } };
    case 'SET_TEXT':
      return { ...state, messageText: action.text };
    case 'SET_COLOR':
      return { ...state, messageColor: action.color };
    case 'SET_FONT':
      return { ...state, messageFontFamily: action.font };
    case 'ADD_STICKER':
      return {
        ...state,
        stickers: [
          ...state.stickers,
          { id: Math.random().toString(36).slice(2), emoji: action.emoji, x: 0.5, y: 0.5 },
        ],
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

const EditorContext = createContext<{ state: EditorState; dispatch: React.Dispatch<EditorAction> } | null>(null);

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  return <EditorContext.Provider value={{ state, dispatch }}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  return ctx;
}