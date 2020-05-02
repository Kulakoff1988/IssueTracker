import React from "react";
import { TextField } from "@material-ui/core";
import { TSearchProps } from "../interfaces/types";

const Search: React.FunctionComponent<TSearchProps> = ({ repoName, userName, setRepoName, setUserName, onClick }) => {
  const handlerOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === `Enter`) {
      onClick();
    }
  };

  return (
    <div className='search'>
      <form action=''>
        <TextField
          id='userName'
          label='User name'
          variant='outlined'
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handlerOnKeyDown}
        />
        <TextField
          id='repository'
          label='Repository'
          variant='outlined'
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          onKeyDown={handlerOnKeyDown}
        />
      </form>
      <div className='search-icon' onClick={onClick} />
    </div>
  );
};

export { Search };
