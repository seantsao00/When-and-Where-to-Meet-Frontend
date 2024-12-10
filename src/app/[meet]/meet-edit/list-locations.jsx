import { fetchWithAuth } from "@/auth";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { revalidatePath } from "next/cache";
import BatchAddForm from "@/components/batch-add-form";

async function addLocation(meetId, _, formData) {
  "use server";
  try {
    const locationsRaw = formData.get("choices");
    const locations = { locationIds: JSON.parse(locationsRaw) };
    console.log(meetId, locations);
    const response = await fetchWithAuth(
      `/api/meets/${meetId}/location-options`,
      {
        method: "POST",
        body: JSON.stringify(locations),
      },
    );
    if (!response.ok) return "Error";
    revalidatePath(`/${meetId}/meet-edit`);
    return "Success";
  } catch (e) {
    console.log(e);
    return "Error";
  }
}

async function inviteUsers(meetId, _, formData) {
  "use server";
  try {
    const usrsRaw = formData.get("choices");
    const usrIds = { usrIds: JSON.parse(usrsRaw) };
    console.log(meetId, usrIds);
    const response = await fetchWithAuth(`/api/meets/${meetId}/invite`, {
      method: "POST",
      body: JSON.stringify(usrIds),
    });
    if (!response.ok) return "Error";
    revalidatePath(`/${meetId}/meet-edit`);
    return "Success";
  } catch (e) {
    console.log(e);
    return "Error";
  }
}

export default async function ListLocations({ meetId }) {
  const response = await fetchWithAuth(`/api/meets/${meetId}/location-options`);
  if (!response.ok) {
    return <Typography variant="h3">Error</Typography>;
  }
  const locations = (await response.json()).items;

  return (
    <Stack direction="column" spacing={1}>
      <Typography variant="h6">Possible Locations</Typography>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Capacity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {locations.map(
              ({
                locationId,
                locationName,
                locationAddress,
                locationPrice,
                locationCapacity,
              }) => (
                <TableRow
                  key={locationId}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {locationId}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {locationName}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {locationAddress}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {locationPrice}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {locationCapacity}
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <BatchAddForm
        action={addLocation.bind(null, meetId)}
        updateText="Update added locations"
        newIdText="New location ID"
        newElementText="New Locations to be added"
        addText="Add location"
      />
      <BatchAddForm
        action={inviteUsers.bind(null, meetId)}
        updateText="Invite users above"
        newIdText="New user ID to invite"
        newElementText="New Users to be invited"
        addText="Add users to invite"
      />
    </Stack>
  );
}
