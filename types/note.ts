export interface Note {
  tag: string;
  id: string;
  title: string;
  content: string;
  createdAt: string;
    updatedAt: string;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';

export interface NoteFormProps {
  onClose: () => void;
}

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}
