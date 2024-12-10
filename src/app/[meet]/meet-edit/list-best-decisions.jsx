import { fetchWithAuth } from "@/auth";
import BatchAddForm from "@/components/batch-add-form";
import { FinalDecision } from "@/components/meet/time-table";
import {
  Stack,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";

export default async function BestDecisions({ meetId }) {
  const response = await fetchWithAuth(`/api/meets/${meetId}/best-decision`);
  if (!response.ok) {
    return <Typography variant="h3">Error</Typography>;
  }
  const bestDecisions = (await response.json()).items;
  console.log(bestDecisions);

  return (
    bestDecisions?.length > 0 && (
      <Stack direction="column" spacing={1}>
        <Typography variant="h6">Suggested decisions</Typography>
        <TableContainer component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="right">Final time</TableCell>
                <TableCell align="right">Location ID</TableCell>
                <TableCell align="right">Location Name</TableCell>
                <TableCell align="right">Available Users</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bestDecisions.map(
                ({ finalTime, locationId, locationName, availableUsrs }) => (
                  <TableRow key={locationId}>
                    <TableCell component="th" scope="row">
                      {finalTime}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {locationId}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {locationName}
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {availableUsrs}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    )
  );
}
