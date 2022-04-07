import { Simple } from "../components/UI/Layout";
import { useTable } from "react-table";
import { useMemo } from "react";

export default function DashboardPage() {
  const data = useMemo(
    () => [
      {
        col1: "Hello",
        col2: "World",
      },
      {
        col1: "react-table",
        col2: "rocks",
      },
      {
        col1: "whatever",
        col2: "you want",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        Header: "Column 1",
        Footer: "La tabla",
        accessor: "col1",
        width: 250,
      },
      {
        Header: "Column 2",
        Footer: "Aplicada",
        accessor: "col2",
        width: 100,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    footerGroups,
  } = useTable({ columns, data });
  return (
    <Simple>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup, i1) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i1}>
              {headerGroup.headers.map((column, i2) => (
                <th
                  {...column.getHeaderProps()}
                  key={i2}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                    width: column.width,
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i3) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={i3}>
                {row.cells.map((cell, i4) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      key={i4}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {footerGroups.map((group, i4) => (
            <tr {...group.getFooterGroupProps()} key={i4}>
              {group.headers.map((column, i5) => (
                <td {...column.getFooterProps()} key={i5}>
                  {column.render("Footer")}
                </td>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </Simple>
  );
}
