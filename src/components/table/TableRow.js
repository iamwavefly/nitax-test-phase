import PropTypes from "prop-types";
import { useState, useEffect } from "react";
// @mui
// components
import { TableRow, TableCell, Typography } from "@mui/material";
import moment from "moment";
import Styles from "./table.module.scss";
// ----------------------------------------------------------------------

export default function PlanetTableRow({ row, selected }) {
  const {
    name,
    climate,
    diameter,
    orbital_period,
    population,
    surface_water,
    terrain,
    created,
  } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  return (
    <TableRow hover className={Styles.tableCell}>
      <TableCell sx={{ display: "flex", alignItems: "center" }}>
        <Typography variant="subtitle2" noWrap>
          {name}
        </Typography>
      </TableCell>
      <TableCell align="left">{climate}</TableCell>
      <TableCell align="left">{diameter}</TableCell>
      <TableCell align="left">{orbital_period}</TableCell>
      <TableCell align="left">{population}</TableCell>
      <TableCell align="left">{surface_water}</TableCell>
      <TableCell align="left">
        <div className={Styles.tableCellWrapper}>
          {terrain
            .split(",")
            ?.splice(0, 2)
            ?.map((elem, index) => (
              <label
                key={index}
                className={`
              label  ${
                elem?.includes("jungle") || elem.includes("desert")
                  ? "dense"
                  : "success"
              }
            `}
              >
                {elem.length > 10 ? elem.substring(0, 10) + "..." : elem}
              </label>
            ))}
        </div>
      </TableCell>
      <TableCell align="left">{moment(created).fromNow()}</TableCell>
    </TableRow>
  );
}
