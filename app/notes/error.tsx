"use client";
type ErrorProps = {
    error: Error;
    reset: () => void;
}


const Error = ({error, reset}: ErrorProps) => {
    return (
        <p>Could not fetch the list of notes. {error.message}</p>
        // <button onClick={reset}>Try again</button>

    );
}

export default Error;