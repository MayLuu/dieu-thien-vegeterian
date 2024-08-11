"use client";
import {
  Button,
  IconButton,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Typography,
  Collapse,
  Box,
  TextField,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Fragment, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
dayjs.extend(customParseFormat);

interface Reservation {
  userName: string;
  phone: string;
  email: string;
  orderTime: string;
  checkinTime?: string;
  participantNumber: number;
  description?: string;
}

const Dashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [successfulReservations, setSuccessfulReservations] = useState<
    Reservation[]
  >([]);
  const [timeoutReservations, setTimeoutReservations] = useState<Reservation[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/${selectedDate.format("DD-MM-YYYY")}`
        );
        if (!response.ok) {
          if (response.status === 404) {
            setReservations([]);
          } else {
            throw new Error("Network response was not ok");
          }
        } else {
          const data = await response.json();
          setReservations(data);
        }
      } catch (error) {
        console.error("Fetch error: ", error);
        setReservations([]);
      }
    };

    fetchData();
  }, [selectedDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = dayjs();
      const updatedTimeoutReservations = reservations.filter((res) => {
        const orderTime = dayjs(res.orderTime, "HH:mm");
        return !res.checkinTime && currentTime.diff(orderTime, "minute") > 40;
      });
      setTimeoutReservations((prev) => [
        ...prev,
        ...updatedTimeoutReservations,
      ]);
      setReservations((prev) =>
        prev.filter((res) => !updatedTimeoutReservations.includes(res))
      );
    }, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [reservations]);

  const handleCheckIn = async (reservation: Reservation) => {
    const updatedReservation = {
      ...reservation,
      checkinTime: dayjs().format("HH:mm"),
    };
    const response = await fetch(
      `http://localhost:3001/${selectedDate.format("DD-MM-YYYY")}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedReservation),
      }
    );
    if (response.ok) {
      setReservations((prev) =>
        prev.map((res) =>
          res.orderTime === reservation.orderTime ? updatedReservation : res
        )
      );
      setSuccessfulReservations((prev) => [...prev, updatedReservation]);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__header" style={{ paddingLeft: "3rem" }}>
        <h1>Đặt chỗ</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Ngày đặt bàn"
            format="DD/MM/YYYY"
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(dayjs(newValue));
            }}
          />
        </LocalizationProvider>
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Giờ đặt bàn/ check-in</TableCell>
              <TableCell>Tên người đặt bàn</TableCell>
              <TableCell>Số điện thoại</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Số người tham gia</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.length > 0 ? (
              reservations
                .sort((a, b) =>
                  dayjs(a.orderTime, "HH:mm").diff(dayjs(b.orderTime, "HH:mm"))
                )
                .map((item, index) => (
                  <Row
                    key={index}
                    {...item}
                    onCheckIn={() => handleCheckIn(item)}
                  />
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={7}>
                  <Typography variant="h6" align="center">
                    Không có dữ liệu
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Dashboard;

const Row = (props: Reservation & { onCheckIn?: () => void }) => {
  const { onCheckIn, ...row } = props;
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
        <TableCell>
          {row.orderTime}
          {row.checkinTime && ` / ${row.checkinTime}`}
        </TableCell>
        <TableCell>{row.userName}</TableCell>
        <TableCell>{row.phone}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.participantNumber}</TableCell>
        <TableCell sx={{ display: "flex", gap: "10px" }}>
          {onCheckIn && (
            <Button variant="contained" color="success" onClick={onCheckIn}>
              Check-in
            </Button>
          )}
          <Button variant="contained" color="secondary">
            Timeout
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <TextField label="Ghi chú" value={row.description} disabled />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
};
