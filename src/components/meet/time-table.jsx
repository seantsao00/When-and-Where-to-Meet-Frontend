"use client";

import "./timetable.css";
import {
  addHashMap,
  arrayToHashMap,
  inRectangle,
  InternalTimeTable,
  minusHashMap,
} from "@/utils";
import { Box, Card, Stack, Typography } from "@mui/material";
import Gradient from "javascript-color-gradient";
import { useState } from "react";

function PrimitiveTimeTable({ timeTable, down, enter, leave, getColor }) {
  return (
    <Box sx={{ overflow: "auto", width: "100%" }}>
      <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          borderSpacing: "0px",
        }}
        onMouseLeave={leave}
      >
        <tbody>
          <tr>
            <td></td>
            {timeTable.headers.map((header) => (
              <td key={header} style={{ textAlign: "center" }}>
                {header}
              </td>
            ))}
          </tr>
          {timeTable.timeCells.map((row, i) => (
            <tr
              key={i}
              style={{
                verticalAlign: "inherit",
              }}
            >
              <td className="common-style time-style">
                {i % 4 == 0 ? `${timeTable.getHour(i)}:00` : ""}
              </td>
              {row.map((cell, j) => (
                <td
                  key={j}
                  onPointerDown={down.bind(this, i, j)}
                  onPointerUp={leave}
                  onMouseEnter={enter.bind(this, i, j)}
                  className={`common-style td-style section${i % 4}`}
                  style={{ backgroundColor: getColor(i, j, cell) }}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Box>
  );
}
const myGreen = "#7FFF00";
const myGray = "#D3D3D3";

function MyTimeTable({ meet, availability, setAvailability }) {
  const timeTable = new InternalTimeTable(meet, availability);
  const [hover, setHover] = useState(false);
  const [add, setAdd] = useState(false);
  const [initCell, setInitCell] = useState([-1, -1]);
  const [currentCell, setCurrentCell] = useState([-1, -1]);
  const getColor = (i, j, cell) => {
    let has = cell > 0;
    if (!has) {
      if (hover && add && inRectangle(i, j, initCell, currentCell)) {
        has = true;
      }
    } else {
      if (hover && !add && inRectangle(i, j, initCell, currentCell)) {
        has = false;
      }
    }
    return has ? myGreen : myGray;
  };

  const down = (i, j, e) => {
    e.preventDefault();
    // console.log("down", i, j);
    setHover(true);
    if (timeTable.timeCells[i][j] > 0) setAdd(false);
    else setAdd(true);
    setInitCell([i, j]);
    setCurrentCell([i, j]);
  };
  const enter = (i, j, e) => {
    e.preventDefault();
    // console.log("enter", i, j);
    setCurrentCell([i, j]);
    // console.log(initCell, currentCell);
  };
  const leave = (e) => {
    e.preventDefault();
    if (hover) {
      const lx = Math.min(initCell[0], currentCell[0]);
      const rx = Math.max(initCell[0], currentCell[0]);
      const ly = Math.min(initCell[1], currentCell[1]);
      const ry = Math.max(initCell[1], currentCell[1]);
      const newAvailability = { ...availability };
      for (let i = lx; i <= rx; i++) {
        for (let j = ly; j <= ry; j++) {
          const index = timeTable.getTimeStamp(i, j);
          if (add && !(index in newAvailability)) {
            newAvailability[index] = 1;
          }
          if (!add && index in newAvailability) {
            delete newAvailability[index];
          }
        }
      }
      setAvailability(newAvailability);
      setHover(false);
      setInitCell([-1, -1]);
      setCurrentCell([-1, -1]);
    }
  };
  return (
    <PrimitiveTimeTable
      timeTable={timeTable}
      down={down}
      enter={enter}
      leave={leave}
      getColor={getColor}
    />
  );
}
function AllTimeTable({ meet, allAvailability }) {
  const allTimeTable = new InternalTimeTable(meet, allAvailability);
  let mx = 0;
  for (const ava in allAvailability) mx = Math.max(mx, allAvailability[ava]);
  const gradient = new Gradient()
    .setColorGradient(myGray, myGreen)
    .setMidpoint(mx + 1);
  const getColor = (i, j, cell) => {
    return cell > 0 ? gradient.getColor(cell) : myGray;
  };
  return (
    <PrimitiveTimeTable
      timeTable={allTimeTable}
      down={() => {}}
      enter={() => {}}
      leave={() => {}}
      getColor={getColor}
    />
  );
}

export function FinalDecision({ decision }) {
  return (
    <Stack spacing={1} direction="column" alignItems="center">
      <Typography variant="h5" textAlign="center">
        Final Decision
      </Typography>
      <Typography variant="h6" textAlign="center">
        <b>Decided start time:</b> {decision.finalTime}
      </Typography>
      <Typography variant="body1" textAlign="center">
        <b>Location ID:</b> {decision.locationId}
      </Typography>
      <Typography variant="body1" textAlign="center">
        <b>Location name:</b> {decision.locationName}
      </Typography>
      <Typography variant="body1" textAlign="center">
        <b>Location address:</b> {decision.locationAddress}
      </Typography>
      <Typography variant="body1" textAlign="center">
        <b>Location price:</b> {decision.locationPrice}
      </Typography>
      <Typography variant="body1" textAlign="center">
        <b>Location capacity:</b> {decision.locationCapacity}
      </Typography>
    </Stack>
  );
}

export default function TimeTable({
  meet,
  initAllAvailabilities,
  initMyAvailabilities,
}) {
  const [myAvailabilities, setMyAvailabilities] = useState(
    arrayToHashMap(initMyAvailabilities),
  );
  const ava = minusHashMap(
    arrayToHashMap(initAllAvailabilities),
    arrayToHashMap(initMyAvailabilities),
  );
  const allAvailabilities = addHashMap(ava, myAvailabilities);
  const tableStyle = {
    flex: "1 1 0px",
    paddingX: "1rem",
    paddingTop: "0.5rem",
    paddingBottom: "1rem",
  };
  return (
    <Stack direction="row" spacing={2}>
      <Card sx={tableStyle}>
        {"finalDecision" in meet ? (
          <FinalDecision decision={meet.finalDecision} />
        ) : (
          <MyTimeTable
            meet={meet}
            availability={myAvailabilities}
            setAvailability={setMyAvailabilities}
          />
        )}
      </Card>
      <Card sx={tableStyle}>
        <AllTimeTable meet={meet} allAvailability={allAvailabilities} />
      </Card>
    </Stack>
  );
}
