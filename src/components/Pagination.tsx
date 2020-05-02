import React from "react";
import "./components.scss";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { Pagination as PaginationSrc } from "@material-ui/lab";
import { TPaginationProps } from "../interfaces/types";

const useSelectStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const usePaginationStyles = makeStyles({
  ul: {
    "& .Mui-selected": {
      backgroundColor: `#00A870`,
      color: `#fff`,
      "&:hover": {
        backgroundColor: `#00A870`,
        filter: "brightness(1.2)",
      },
    },
    "& .Mui-disabled": {
      opacity: 0.5,
    },
  },
});

const Pagination: React.FunctionComponent<TPaginationProps> = ({ count, setPageCount, page, setPage, pageCount }) => {
  const selectClasses = useSelectStyles();
  const paginationClasses = usePaginationStyles();

  const handlerOnChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setPageCount(e.target.value as number);
  };

  return (
    <div className='pagination'>
      <FormControl variant='outlined' className={selectClasses.formControl}>
        <InputLabel id='page-count-label'>Показывать по</InputLabel>
        <Select
          id='page-count'
          labelId='page-count-label'
          value={String(pageCount)}
          onChange={handlerOnChange}
          label='Показывать по'>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <PaginationSrc
        classes={paginationClasses}
        count={Math.ceil(count / pageCount)}
        page={page}
        onChange={(e, page) => setPage(page)}
        showFirstButton
        showLastButton
        size='small'
      />
    </div>
  );
};

export { Pagination };
