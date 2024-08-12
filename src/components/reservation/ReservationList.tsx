"use client";
import { Reservation } from "@/models";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import ReservationItem from "./ReservationItem";

interface ReservationListProps {
  reservations: Reservation[];
}

const ReservationList: React.FC<ReservationListProps> = ({ reservations }) => {
  const sortedReservations = reservations.sort((a, b) =>
    dayjs(a.orderTime, "HH:mm").diff(dayjs(b.orderTime, "HH:mm"))
  );

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Giờ đặt bàn</TableCell>
            <TableCell>Tên người đặt bàn</TableCell>
            <TableCell>Số điện thoại</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Số người tham gia</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedReservations.length > 0 ? (
            sortedReservations.map((reservation) => (
              <ReservationItem key={reservation.id} {...reservation} />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6}>
                <Typography variant="h6" align="center">
                  Không có dữ liệu
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ReservationList;
