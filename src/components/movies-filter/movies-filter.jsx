import { useState } from "react";

export const MoviesFilter = ({ onSearch }) => {
  const [movie, setMovie] = useState("");

  const handleChange = (e) => {
    setMovie(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by movie title"
        value={movie}
        onChange={handleChange}
      />
    </div>
  );
};
