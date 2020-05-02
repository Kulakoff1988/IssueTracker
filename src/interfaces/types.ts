import { Url } from "url";

export type TPaginationProps = {
  count: number;
  setPageCount(arg?: any): void;
  page: number;
  setPage(arg?: any): void;
  pageCount: number;
  setPageCount(arg?: any): void;
};

export type TSearchProps = {
  userName: string;
  repoName: string;
  setUserName(arg: string): void;
  setRepoName(arg: string): void;
  onClick(): void;
};

export type TIssue = {
  title: string;
  created_at: string;
  number: number;
  state: string;
  body: string;
  user: {
    avatar_url: string;
  };
};

export type TIssuesTableProps = {
  issues: TIssue[];
};
