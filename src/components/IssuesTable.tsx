import React, { useState } from "react";
import "./components.scss";
import { TIssuesTableProps, TIssue } from "../interfaces/types";
import { Collapse } from "@material-ui/core";

const getNormalizeDate = (date: string) => {
  const d = date.substr(0, 10);
  const [year, month, day] = d.split(`-`);
  return `${day}.${month}.${year}`;
};

const getNormalizeDesc = (body: string) => {
  return body === `` ? `No description` : body.split(`\n`).map((elem) => <div>{elem}</div>);
};

const IssuesTable: React.FunctionComponent<TIssuesTableProps> = ({ issues }) => {
  const [activeIssue, setActiveIssue] = useState<number>(-1);

  const handlerOnClick = (issue: TIssue) => {
    setActiveIssue(activeIssue === issue.number ? -1 : issue.number);
  };

  return (
    <div className='content'>
      {issues.map((issue) => (
        <div key={issue.number} className='issue' onClick={() => handlerOnClick(issue)}>
          <div className='issue-caption'>
            <div>
              <img src={issue.user.avatar_url} alt='' />
            </div>
            <div>{issue.title}</div>
            <div className='date'>
              #{issue.number} created at {getNormalizeDate(issue.created_at)}
            </div>
          </div>
          <div>
            <Collapse in={issue.number === activeIssue}>
              <div className='issue-body'>{getNormalizeDesc(issue.body)}</div>
            </Collapse>
          </div>
        </div>
      ))}
    </div>
  );
};

export { IssuesTable };
