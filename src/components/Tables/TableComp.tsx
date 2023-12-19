import { Box, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];

  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
}

const TableComp = <T extends object>({ data, columns }: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Box height="350px" overflowY="auto">
        <Table variant="simple" size={{ base: "sm" }}>
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>

          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell, index) => (
                  <Td key={index}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default TableComp;
