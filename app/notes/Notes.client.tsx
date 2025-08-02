"use client";

import { useEffect, useState } from "react";
import css from "../../css/App.module.css";
import Modal from "../../components/Modal/Modal";
import NoteList from "../../components/NoteList/NoteList";
import SearchBox from "../../components/SearchBox/SearchBox";
import NoteForm from "../../components/NoteForm/NoteForm";
import { useDebounce } from "use-debounce";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import Pagination from "../../components/Pagination/Pagination";
import { init } from "next/dist/compiled/webpack/webpack";
import { Note } from "@/types/note";

export interface NewNoteData {
  title: string;
  content: string;
  tag: string;
}

 export interface FetchNoteResponse {
  notes: Note[];
  total: number;
  page: number;
  perPage: number;
}


 interface NotesClientProps {
  initialData: FetchNoteResponse;
}

export default function NotesClient({ initialData }: NotesClientProps
) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const perPage = 12;

  useEffect(() => {
    setPage(1);
  }, [debouncedSearchTerm]);

  const { data, isLoading } = useQuery<FetchNoteResponse>({
    queryKey: ["notes", page, debouncedSearchTerm],
    queryFn: () => fetchNotes(page, perPage, debouncedSearchTerm),
    placeholderData: keepPreviousData,
    initialData: page === 1 && debouncedSearchTerm === '' ? initialData : undefined,
  });

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <button onClick={openModal} className={css.submitButton}>
          Create Note
        </button>
        <SearchBox value={searchTerm} onChange={setSearchTerm} />
      </header>

      {isLoading && <strong className={css.loading}>Loading notes...</strong>}

      {data && data.notes.length > 0 && <NoteList notes={data.notes} />}

      {data && data.total > perPage && (
        <Pagination
          pageCount={Math.ceil(data.total / perPage)}
          currentPage={page}
          onPageChange={setPage}
        />
      )}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}