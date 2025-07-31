"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";
import css from "../main.module.css";
import type { Note } from "../Notes.client";

interface NoteDetailsProps {
  noteId: number;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsProps) {
  const { data: note, isLoading, error } = useQuery<Note>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId.toString()),
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !note) return <p>Something went wrong.</p>;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note.title}</h2>
        </div>
        <p className={css.content}>{note.content}</p>
        <p className={css.date}>
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}