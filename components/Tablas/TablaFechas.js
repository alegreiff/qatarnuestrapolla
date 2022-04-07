import { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Text,
  Center,
} from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { format, parse, addHours } from "date-fns";
import { es } from "date-fns/locale";
import { BanderaPais } from "./BanderaPais";
import estilos from "./TablaBase.module.css";
import { EstrellasPartido } from "./EstrellasPartido";

export const TablaFechas = ({ datos, columnas }) => {
  const losdatos = useMemo(() => datos, [datos]);

  const lascolumnas = useMemo(
    () => [
      {
        Header: "Fechas",
        columns: [
          {
            Header: "Día",
            accessor: "",

            Cell: ({ row: { original } }) =>
              capitalizeFirstLetter(
                format(original.datte, "cccc", { locale: es })
              ),
          },

          {
            Header: "Fecha",
            accessor: "datte",

            Cell: ({ value }) => {
              return format(value, "dd 'de' MMM H':'mm", { locale: es });
              //return value;
            },
            /* Cell: ({ row: { original } }) =>
          format(original.datte, "dd 'de' LLLL H':'mm", { locale: es }), */
          },
        ],
      },
      {
        Header: "Datos COLS",
        columns: [
          {
            Header: "Equipo",
            accessor: "local",
            width: 100,

            Cell: ({ row: { original } }) => {
              if (original.code_loc) {
                //return original.code_loc;
                return (
                  <BanderaPais
                    bandera={original.code_loc}
                    nombre={original.local}
                  />
                );
              } else {
                return original.local;
              }
            },
          },
          {
            Header: "Equipo",
            accessor: "visitante",
            width: 100,

            Cell: ({ row: { original } }) => {
              if (original.code_vis) {
                //return original.code_vis;
                return (
                  <BanderaPais
                    bandera={original.code_vis}
                    nombre={original.visitante}
                  />
                );
              } else {
                return original.visitante;
              }
            },
          },
          {
            Header: "GRUPO",
            accessor: "grupo",
            maxWidth: 60,
            Cell: ({ value }) => {
              return (
                <Center>
                  <Text fontSize="4xl" color="grey">
                    {" "}
                    {value}{" "}
                  </Text>
                </Center>
              );
            },
          },

          //{ Header: "Estadio", accessor: "estadio" },

          /* {
            Header: "Ranking FIFA",
            accessor: "power",
          }, */
          {
            Header: "Interés",
            accessor: "power",
            //width: 10,
            maxWidth: 60,
            disableSortBy: false,
            Cell: ({ row: { original } }) => {
              if (original.power > 3350) {
                return <EstrellasPartido value={original.power} times={5} />;
              } else if (original.power > 3260) {
                return <EstrellasPartido value={original.power} times={4} />;
              } else if (original.power > 3150) {
                return <EstrellasPartido value={original.power} times={3} />;
              } else if (original.power > 3080) {
                return <EstrellasPartido value={original.power} times={2} />;
              } else {
                return <EstrellasPartido value={original.power} times={1} />;
              }
            },
          },
        ],
      },
    ],
    []
  );

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const tableInstance = useTable(
    { columns: lascolumnas, data: losdatos },
    useSortBy
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, ii) => (
            <Tr {...headerGroup.getHeaderGroupProps()} key={ii}>
              {headerGroup.headers.map((column, i2) => (
                <Th
                  className={estilos.centered}
                  userSelect="none"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  key={i2}
                  style={{
                    width: column.width,
                    maxWidth: column.maxWidth,
                  }}
                >
                  <Flex alignItems="center" className={estilos.icon}>
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <ChevronDownIcon ml={1} w={4} h={4} />
                      ) : (
                        <ChevronUpIcon ml={1} w={4} h={4} />
                      )
                    ) : (
                      ""
                    )}
                  </Flex>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i3) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()} key={i3}>
                {row.cells.map((cell, i4) => {
                  const power = cell.row.values.power;
                  return (
                    <Td
                      {...cell.getCellProps()}
                      /*className={
                        power > 3320
                          ? estilos.clase100
                          : power > 3178
                          ? estilos.clase80
                          : power > 3036
                          ? estilos.clase50
                          : estilos.clase10
                      }*/
                      key={i4}
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
};
