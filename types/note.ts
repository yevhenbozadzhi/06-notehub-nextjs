import { ReactNode } from "react";

export interface Note {
  tag: ReactNode;
  id: string;
  title: string;
  content: string;
  createdAt: string;
    updatedAt: string;
}

export interface NewNoteData {
  title: string;
  content: string;
}

export type NoteTag = 'Todo' | 'Work' | 'Personal' | 'Meeting' | 'Shopping';