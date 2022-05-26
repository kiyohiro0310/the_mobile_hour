import { NextPage } from 'next';
import React, { FormEvent, useEffect, useMemo, useState } from 'react'
import { ChangeLogType } from '../../Model/Types';
import classes from "./admin.module.scss";

interface PropsType {
  changeLogs: ChangeLogType[];
}

async function findChangelog(data: {}){
  const response = await fetch("/api/admin/find-changelog", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const changelogs = response.json();
  if(!response.ok) {
    throw new Error("Error occured when searching changelog ");
  }

  return changelogs;
}

const ChangeLog: NextPage<PropsType> = (props) => {
  const changeLogs = props.changeLogs;
  const [logs, setLogs] = useState<ChangeLogType[]>();
  const [isLoading, setIsLoading] = useState(false);

  let logsArr = useMemo(() => {
    if(!logs) {
      setLogs(changeLogs);
    }
    return logs;
  }, [logs, changeLogs])

  if(!logsArr) {
    return (<p>Loading...</p>)
  }


  // if(logs!.length > 0) {
  //   logsArr = logs;
  // }

  const productIdRef = React.createRef<HTMLInputElement>();
  const userIdRef = React.createRef<HTMLInputElement>();
  const dateFromRef = React.createRef<HTMLInputElement>();
  const dateToRef = React.createRef<HTMLInputElement>();


  async function submitHandler(e: FormEvent) {
      e.preventDefault();

      const enteredProductID = productIdRef.current?.value;
      const enteredUserID = userIdRef.current?.value;
      const enteredDateFrom = dateFromRef.current?.value;
      const enteredDateTo = dateToRef.current?.value;

      const searchChangelog = {
        product_id: enteredProductID,
        user_id: enteredUserID,
        date_from: enteredDateFrom,
        date_to: enteredDateTo
      }

      const searchedChangelogs = await findChangelog(searchChangelog);

      setLogs(searchedChangelogs);
  }

  return (
    <div className={classes.change_container}>
        <h3><span>Change</span> log</h3>
          <form onSubmit={submitHandler}>
            <div className={classes.form}>
              <div>
                <label htmlFor="">Product ID:</label>
                <input type="text" ref={productIdRef}/>
              </div>
              <div>
                <label htmlFor="">User ID:</label>
                <input type="text" ref={userIdRef}/>
              </div>
              <div>
                <label htmlFor="">Modified From:</label>
                <input type="date" ref={dateFromRef}/>
              </div>
              <div>
                <label htmlFor="">Modified To:</label>
                <input type="date" ref={dateToRef}/>
              </div>
            </div>
            <input type="submit" value="Search" className={classes.submit}/>
          </form>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Create date</th>
            <th>Modify date</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Action</th>
          </tr>
        </thead>

          {logsArr.map((changeLog: ChangeLogType) => (
            <tbody key={changeLog.id}>
              <tr>
                <td>{changeLog.id}</td>
                <td>{changeLog.date_created}</td>
                <td>{changeLog.date_last_modified}</td>
                <td>{changeLog.user_id}</td>
                <td>{changeLog.product_id}</td>
                <td>{changeLog.action}</td>
              </tr>
            </tbody>
          ))}
      </table>
    </div>
  )
}

export default ChangeLog