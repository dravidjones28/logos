import { Box, Table, Thead, Tr, Th, Tbody, Td } from "@chakra-ui/react";
import {
  ColumnDef,
  FilterFn,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { RefObject, useEffect, useRef } from "react";

interface ReactTableProps<T extends object> {
  data: T[];
  columns: ColumnDef<T>[];

  showNavigation?: boolean;
  showGlobalFilter?: boolean;
  filterFn?: FilterFn<T>;
  elementRef?: RefObject<HTMLTableElement>;
}

const TableComp = <T extends object>({
  data,
  columns,
  elementRef: forwardedRef,
}: ReactTableProps<T>) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const internalTableRef = useRef<HTMLTableElement>(null);
  const forwardedRef1 = forwardedRef || internalTableRef;

  useEffect(() => {
    if (forwardedRef1.current !== internalTableRef.current) {
      (forwardedRef1 as any).current = internalTableRef.current;
    }
  }, [forwardedRef1]);

  return (
    <>
      <Box height="350px" overflowY="auto">
        <Table variant="simple" size={{ base: "sm" }} ref={internalTableRef}>
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
