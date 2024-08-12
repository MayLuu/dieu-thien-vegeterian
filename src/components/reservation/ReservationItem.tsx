"use client";
import {
  TableRow,
  TableCell,
  IconButton,
  Collapse,
  Box,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState, Fragment } from "react";
import { Reservation } from "@/models";

const ReservationItem: React.FC<Reservation> = ({
  id,
  userName,
  phone,
  email,
  orderTime,
  participantNumber,
  notes,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{orderTime}</TableCell>
        <TableCell>{userName}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{participantNumber}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TextField label="Ghi chú" value={notes} disabled fullWidth />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};

export default ReservationItem;
