"use client";
import { database } from "@/config/firebaseConfig";
import { send } from "@/lib/sendEmailAction";
import { Validate } from "@/utils/validate";
import {
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ref, set } from "firebase/database";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

dayjs.extend(customParseFormat);

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

type OrderForm = {
  userName: string;
  phone: string;
  orderDate: Date;
  orderTime: Date;
  email: string;
  participantNumber: number;
  notes: string;
};

type Locale = "vi" | "en" | "zh";
const isValidLocale = (locale: string): locale is Locale => {
  return ["vi", "en", "zh"].includes(locale);
};

const OrderFormComponent = () => {
  const t = useTranslations();
  const localActive = useLocale();

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [isTimeValid, setIsTimeValid] = useState(true);

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<OrderForm>();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const onSubmit: SubmitHandler<OrderForm> = async (data) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        orderDate: dayjs(data.orderDate).format("DD-MM-YYYY"),
        orderTime: dayjs(data.orderTime).format("HH:mm"),
      };

      const newOrderId = Date.now().toString();
      const orderRef = ref(database, `orders/${newOrderId}`);
      await set(orderRef, formattedData);

      setOpen(true);
      if (isValidLocale(localActive)) {
        const formData = new FormData();
        Object.entries(formattedData).forEach(([key, value]) =>
          formData.append(key, value as string)
        );
        await send(formData, localActive);
      }
    } catch (error) {
      console.error("Error saving data to Firebase:", error);
    } finally {
      setLoading(false);
    }
  };

  const orderDate = watch("orderDate");
  const orderTime = watch("orderTime");

  useEffect(() => {
    if (orderDate && orderTime) {
      const selectedDateTime = dayjs(orderDate)
        .set("hour", dayjs(orderTime).hour())
        .set("minute", dayjs(orderTime).minute());
      setIsTimeValid(selectedDateTime.isAfter(dayjs()));
    }
  }, [orderDate, orderTime]);

  return (
    <>
      <h2>{t("general.order")}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <Controller
            control={control}
            name="userName"
            rules={{
              required: t("form.required"),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                autoComplete="off"
                name="userName"
                placeholder={t("form.userName")}
                label={t("form.userName")}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                required
                fullWidth
              />
            )}
          />

          <Controller
            control={control}
            name="phone"
            rules={{
              required: t("form.required"),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                autoComplete="off"
                type="number"
                label={t("general.phoneNumber")}
                placeholder={t("general.phoneNumber")}
                name="phone"
                required
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                InputProps={{
                  inputProps: {
                    min: 0,
                  },
                }}
                fullWidth
              />
            )}
          />
        </div>
        <Box className="form-row">
          <Controller
            control={control}
            name="orderDate"
            rules={{
              required: t("form.required"),
              validate: (value) => {
                if (!value || !dayjs(value).isAfter(dayjs().subtract(1, "d"))) {
                  return t("form.invalidDate");
                }
                return true;
              },
            }}
            render={({ field: { onChange, value } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={localActive}
              >
                <DatePicker
                  disablePast
                  label={t("form.orderDate")}
                  format="DD/MM/YYYY"
                  onChange={(date) => onChange(date ? date.toDate() : null)}
                  value={value ? dayjs(value) : null}
                  minDate={dayjs()}
                />
              </LocalizationProvider>
            )}
          />

          <Controller
            control={control}
            name="orderTime"
            rules={{
              required: t("form.required"),
              validate: (value) => {
                if (!value || !dayjs(value).isAfter(dayjs().add(30, "m"))) {
                  return t("form.invalidTime");
                }
                return true;
              },
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale={localActive}
              >
                <TimePicker
                  label={t("form.orderTime")}
                  ampm={false}
                  onChange={(time) => onChange(time ? time.toDate() : null)}
                  value={value ? dayjs(value) : dayjs().add(30, "m")}
                  minTime={dayjs().add(30, "m")}
                  disablePast
                />
              </LocalizationProvider>
            )}
          />
        </Box>
        <Box className="form-row">
          <Controller
            control={control}
            name="email"
            rules={{
              required: t("form.required"),
              validate: (value) =>
                Validate.email(value) || t("form.invalidEmail"),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                autoComplete="off"
                label={t("general.email")}
                placeholder={t("general.email")}
                name="email"
                required
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                fullWidth
              />
            )}
          />
          <Controller
            control={control}
            name="participantNumber"
            rules={{
              required: t("form.required"),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextField
                autoComplete="off"
                type="number"
                label={t("form.participantNumber")}
                placeholder={t("form.participantNumber")}
                name="participantNumber"
                required
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                InputProps={{
                  inputProps: {
                    min: 1,
                  },
                }}
                fullWidth
              />
            )}
          />
        </Box>

        <Controller
          control={control}
          name="notes"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextField
              label={t("form.comment")}
              placeholder={t("form.comment")}
              name="notes"
              multiline
              rows={8}
              onBlur={onBlur}
              value={value}
              onChange={onChange}
              fullWidth
            />
          )}
        />

        {errors.email && (
          <span className="error">{t("form.invalidEmail")}</span>
        )}
        {errors.orderDate && (
          <span className="error">{t("form.invalidDate")}</span>
        )}
        {errors.orderTime && (
          <span className="error">{t("form.invalidTime")}</span>
        )}

        <Button
          className="submit-btn"
          variant="contained"
          type="submit"
          disabled={loading || !isTimeValid}
        >
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CircularProgress
                size={24}
                sx={{ color: "white", marginRight: "8px" }}
              />
              {t("form.send")}
            </Box>
          ) : (
            t("form.send")
          )}
        </Button>
      </form>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {t("form.sendEmailSuccess")}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderFormComponent;
