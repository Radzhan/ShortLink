import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { SetLink, setUrl } from "./store/Url";
function App() {
  const [link, setLink] = useState({
    url: "",
  });
  const dispatch = useAppDispatch();
  const postLink = useAppSelector(SetLink);

  const post = async () => {
    await dispatch(setUrl(link));
  };

  const onCardChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLink((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    post();
    setLink({
      url: "",
    });
  };
  return (
    <div className="App">
      <h1>Shorten your link</h1>
      <form onSubmit={onSubmit}>
        <TextField
          id="outlined-basic"
          label="Outlined"
          required
          variant="outlined"
          name="url"
          value={link.url}
          onChange={onCardChange}
        />
        <Button variant="contained" type="submit">
          Contained
        </Button>
      </form>
      <p>
        <b>Your link now looks like this</b>
      </p>
      <p>http://localhost:8000/links/{postLink.shortUrl}</p>
    </div>
  );
}

export default App;
