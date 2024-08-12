"use client";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Typography } from "@mui/material";
import { get, ref } from "firebase/database";
import { database } from "@/config/firebaseConfig";
import { Reservation } from "@/models";
import ReservationList from "@/components/reservation/ReservationList";

dayjs.extend(customParseFormat);

const Dashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filteredReservations, setFilteredReservations] = useState<
    Reservation[]
  >([]);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const fetchReservations = () => {
    const reservationRef = ref(database, "orders");
    get(reservationRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const reservationArr: Reservation[] = Object.entries(
            snapshot.val()
          ).map(([id, data]: [string, any]) => ({
            id,
            ...data,
          }));
          setReservations(reservationArr);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  useEffect(() => {
    fetchReservations(); // Fetch data ngay lập tức khi component mount
    const intervalId = setInterval(fetchReservations, 600000); // Fetch data mỗi 10 phút

    return () => clearInterval(intervalId); // Cleanup interval khi component unmount
  }, []);

  useEffect(() => {
    const filtered = reservations.filter((reservation) =>
      dayjs(reservation.orderDate, "DD-MM-YYYY").isSame(selectedDate, "day")
    );
    setFilteredReservations(filtered.length > 0 ? filtered : reservations);
  }, [selectedDate, reservations]);

  return (
    <div className="dashboard">
      <div className="dashboard__header" style={{ paddingLeft: "3rem" }}>
        <Typography variant="h4">Đặt chỗ</Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Ngày đặt bàn"
            format="DD/MM/YYYY"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(dayjs(newValue))}
          />
        </LocalizationProvider>
      </div>
      <ReservationList reservations={filteredReservations} />
    </div>
  );
};

export default Dashboard;
