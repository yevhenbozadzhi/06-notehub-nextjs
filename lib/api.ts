import axios from "axios";
import type { Note } from "../app/notes/Notes.client";

const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const instance = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

interface FetchNotesResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
}

export const fetchNotes = async (
  page = 1,
  perPage = 12,
  search = ""
): Promise<FetchNotesResponse> => {
  const params: Record<string, string | number> = { page, perPage };
  if (search.trim() !== "") {
    params.search = search.trim();
  }

  const res = await instance.get<FetchNotesResponse>("/notes", {
    params,
  });
  return res.data;
};

export const addNote = async (newNote: NewNoteData): Promise<Note> => {
  const res = await instance.post<Note>("/notes", newNote);
  return res.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const res = await instance.delete<Note>(`/notes/${id}`);
  return res.data;
};

export interface NoteFormProps {
  onClose: () => void;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
  const res = await instance.get<Note>(`/notes/${id}`);
  return res.data;
};

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}
// type PropsByID = {
//   params: Promise<{ id: string }>;
// };

// const fetchNotesByID = async ({params}: PropsByID) => {
//   const { id } = await params;
//   console.log('note id:', id);
//   return <div>NoteDetails</div>
// }

// export default fetchNotesByID;