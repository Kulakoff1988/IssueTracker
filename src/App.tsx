import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { IssuesTable } from "./components/IssuesTable";
import { Pagination } from "./components/Pagination";
import { TIssue } from "./interfaces/types";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core/";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#fff",
    },
  })
);

type TTools = {
  isLoad: boolean;
  isShowSnackbar: boolean;
};

const App: React.FunctionComponent = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState<string>(`facebook`);
  const [repoName, setRepoName] = useState<string>(`react`);
  const [page, setPage] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [issues, setIssues] = useState<TIssue[]>([]);
  const [tools, setTools] = useState<TTools>({ isLoad: false, isShowSnackbar: false });

  const getIssues = () => {
    if (!userName || !repoName) return;
    setTools({ isLoad: true, isShowSnackbar: false });
    let _page = page;
    if (Math.ceil(totalCount / pageCount) < page) {
      _page = Math.ceil(totalCount / pageCount);
    }
    axios
      .get(`https://api.github.com/search/issues?q=repo:${userName}/${repoName}+type:issue+state:open`, {
        params: {
          page: _page,
          per_page: pageCount,
        },
      })
      .then(({ data }) => {
        setTotalCount(data.total_count);
        setIssues(data.items);
        setTools({ isLoad: false, isShowSnackbar: false });
        if (Math.ceil(data.total_count / pageCount) < page) {
          setPage(Math.ceil(data.total_count / pageCount));
        }
        console.log(`data`, data);
      })
      .catch(() => {
        setTools({ isLoad: false, isShowSnackbar: true });
        setIssues([]);
        setTotalCount(0);
      });
  };

  useEffect(() => {
    getIssues();
  }, [pageCount, page]);

  return (
    <div className='App'>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={tools.isShowSnackbar}
        autoHideDuration={5000}
        message='User name or repository name not found'
      />
      <Header />
      <Search
        onClick={getIssues}
        repoName={repoName}
        userName={userName}
        setUserName={(value) => setUserName(value)}
        setRepoName={(value) => setRepoName(value)}
      />
      <IssuesTable issues={issues} />
      {totalCount > 0 && (
        <Pagination
          count={totalCount}
          pageCount={pageCount}
          setPageCount={setPageCount}
          setPage={setPage}
          page={page}
        />
      )}
      <Backdrop open={tools.isLoad} className={classes.backdrop}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  );
};

export default App;
