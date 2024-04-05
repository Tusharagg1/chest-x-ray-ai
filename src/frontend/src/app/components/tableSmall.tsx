/*
* Author: Allison Cook
* Date Created: January 2024
* Purpose: Create exported table element, that is smaller for X-ray study page
*/
//referenced: https://www.bekk.christmas/post/2020/22/create-a-generic-table-with-react-and-typescript
/* eslint-disable @typescript-eslint/ban-ts-comment */
//ts comments stop errors that didn't effect compliation or function 
type ColumnDefinitionType<T, K extends keyof T> = {
  key: K;
  header: string;
  width?: number | string;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Tstyle = {
  borderCollapse: 'collapse',
  width: '80vw',
  height: '10vh',
} as const;

const Table = <T, K extends keyof T>({
  data,
  columns,
}: TableProps<T, K>): JSX.Element => {
  return (
    <table style={Tstyle}>
      <TableHeader columns={columns} />
      <TableRows data={data} columns={columns} />
    </table>
  );
};

type TableHeaderProps<T, K extends keyof T> = {
  columns: Array<ColumnDefinitionType<T, K>>;
};

const TableHeader = <T, K extends keyof T>({
  columns,
}: TableHeaderProps<T, K>): JSX.Element => {
  const headers = columns.map((column, index) => {
    const style = {
      width: column.width ?? '10%', // 100 is our default value if width is not defined
      borderBottom: '2px solid black',
      border: '2px solid gray',
      backgroundColor: 'rgb(229, 231, 235)',
      fontsize: '10',
      height: '20%',
    };

    return (
      <th key={`headCell-${index}`} style={style}>
        {column.header}
      </th>
    );
  });

  return (
    <thead>
      <tr>{headers}</tr>
    </thead>
  );
};

type TableRowsProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
};

const Sstyle = {
  border: '2px solid gray',
  backgroundColor: 'white',
  height: '5vh',
};

const TableRows = <T, K extends keyof T>({
  data,
  columns,
}: TableRowsProps<T, K>): JSX.Element => {
  const rows = data.map((row, index) => {
    return (
      <tr key={`row-${index}`}>
        {columns.map((column, index2) => {
            return (
              <td key={`cell-${index2}`} style={Sstyle}>
                {/* @ts-ignore */}
                {row[column.key]}
              </td>
            );
        })}
      </tr>
    );
  });

  return <tbody>{rows}</tbody>;
};

export default Table;
