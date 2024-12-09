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
import LocationAdder from "./edit-locations";
import { revalidatePath } from "next/cache";

async function addLocation(meetId, _, formData) {
  "use server";
  try {
    const locationsRaw = formData.get("locations");
    const locations = JSON.parse(locationsRaw);
    console.log(locations);
    const response = await fetchWithAuth(
      `/api/meets/${meetId}/location-options`,
      {
        method: "POST",
        body: locationsRaw,
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

export default async function ListLocations({ meetId }) {
  //   const response = await fetchWithAuth(`/api/meets/${meetId}/location-options`);
  //   if (!response.ok) {
  //     return <Typography variant="h3">Error</Typography>;
  //   }
  //   const locations = (await response.json()).items;

  const locations = [
    {
      locationId: "zoom",
      locationName: "Zoom",
      locationAddress: "zoom.us",
      locationPrice: 0,
      locationCapacity: 100,
    },
    {
      locationId: "teams",
      locationName: "Teams",
      locationAddress: "teams.microsoft.com",
      locationPrice: 0,
      locationCapacity: 100,
    },
    {
      locationId: "meet",
      locationName: "Meet",
      locationAddress: "meet.google.com",
      locationPrice: 0,
      locationCapacity: 100,
    },
  ];
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
                    title: `click to decide ${locationId} as final location`,
                    cursor: "pointer",
                  }}
                  // onClick={() => {
                  //   // TODO: decide final location
                  // }}
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
      <LocationAdder meetId={meetId} action={addLocation} />
    </Stack>
  );
}
