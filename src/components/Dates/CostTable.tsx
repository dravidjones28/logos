import {
  TableContainer,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";

interface TableProps {
  weekdays: number;
  weekends: number;
  totalDays: number;
  weekdayCost: number;
  weekendCost: number;
  totalCost: number;
}

interface TableValues {
  tableValues: TableProps | undefined;
}

const CostTable = ({ tableValues }: TableValues) => {
  return (
    <TableContainer>
      <Table variant="simple">
        <TableCaption>LOGOS RETREAT CENTER</TableCaption>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Number</Th>
            <Th isNumeric>Cost</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>WeekDays</Td>
            <Td>{`${tableValues?.weekdays}`}</Td>
            <Td isNumeric>{`${tableValues?.weekdayCost}`}</Td>
          </Tr>
          <Tr>
            <Td>WeekEnds</Td>
            <Td>{`${tableValues?.weekends}`}</Td>
            <Td isNumeric>{`${tableValues?.weekendCost}`}</Td>
          </Tr>
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>Total Days</Th>
            <Th>{`${tableValues?.totalDays}`}</Th>
            <Th isNumeric>{`${tableValues?.totalCost}`}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default CostTable;
