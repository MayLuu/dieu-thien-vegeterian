"use client";
import { database } from "@/config/firebaseConfig";
import { send } from "@/lib/sendEmailAction";
import { Validate } from "@/utils/validate";
import { 
  Button, 
  DatePicker, 
  Input, 
  InputNumber, 
  message, 
  Space, 
  Spin, 
  TimePicker 
} from "antd";
import { ref, set } from "firebase/database";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

type OrderForm = {
  userName: string;
  phone: string;
  orderDate: dayjs.Dayjs;
  orderTime: dayjs.Dayjs;
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
  const [isTimeValid, setIsTimeValid] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const { 
    control, 
    handleSubmit, 
    watch, 
    reset,
    formState: { errors } 
  } = useForm<OrderForm>({
    defaultValues: {
      orderTime: dayjs().add(30, 'm')
    }
  });

  const watchOrderDate = watch('orderDate');
  const watchOrderTime = watch('orderTime');

  useEffect(() => {
    if (watchOrderDate && watchOrderTime) {
      const selectedDateTime = watchOrderDate
        .set('hour', watchOrderTime.hour())
        .set('minute', watchOrderTime.minute());

      const isWithinAllowedTime =
        (selectedDateTime.hour() >= 10 && selectedDateTime.hour() < 13) ||
        (selectedDateTime.hour() >= 17 && selectedDateTime.hour() < 20);
      const isInFuture = selectedDateTime.isAfter(dayjs());

      setIsTimeValid(isWithinAllowedTime && isInFuture);
    }
  }, [watchOrderDate, watchOrderTime]);

  const onSubmit = async (data: OrderForm) => {
    setLoading(true);
    try {
      const formattedData = {
        ...data,
        orderDate: data.orderDate.format("DD-MM-YYYY"),
        orderTime: data.orderTime.format("HH:mm"),
      };

      const newOrderId = Date.now().toString();
      const orderRef = ref(database, `orders/${newOrderId}`);
      await set(orderRef, formattedData);

      messageApi.success(t("form.sendEmailSuccess"));
      
      if (isValidLocale(localActive)) {
        const formData = new FormData();
        Object.entries(formattedData).forEach(([key, value]) =>
          formData.append(key, value as string)
        );
        await send(formData, localActive);
      }
      
      reset();
    } catch (error) {
      console.error("Error saving data to Firebase:", error);
      messageApi.error(t("form.sendEmailError"));
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (value: string) => {
    if (!value || Validate.email(value)) {
      return true;
    }
    return t("form.invalidEmail");
  };

  const disabledDate = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  return (
    <div className="order-form-container">
      {contextHolder}
      <h2 className="form-title">{t("general.order")}</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="order-form">
        <div className="form-row">
          <div className="form-field">
            <label>{t("form.userName")}</label>
            <Controller
              name="userName"
              control={control}
              rules={{ required: t("form.required") as string }}
              render={({ field }) => (
                <Input 
                  {...field} 
                  placeholder={t("form.userName")} 
                  status={errors.userName ? "error" : ""}
                />
              )}
            />
            {errors.userName && <p className="error-message">{errors.userName.message}</p>}
          </div>

          <div className="form-field">
            <label>{t("general.phoneNumber")}</label>
            <Controller
              name="phone"
              control={control}
              rules={{ required: t("form.required") as string }}
              render={({ field }) => (
                <Input 
                  {...field} 
                  placeholder={t("general.phoneNumber")} 
                  status={errors.phone ? "error" : ""}
                />
              )}
            />
            {errors.phone && <p className="error-message">{errors.phone.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>{t("form.orderDate")}</label>
            <Controller
              name="orderDate"
              control={control}
              rules={{ 
                required: t("form.required") as string,
                validate: value => 
                  value && value.isAfter(dayjs().subtract(1, "d")) || 
                  t("form.invalidDate") as string
              }}
              render={({ field }) => (
                <DatePicker 
                  {...field}
                  format="DD/MM/YYYY" 
                  style={{ width: '100%' }}
                  disabledDate={disabledDate}
                  status={errors.orderDate ? "error" : ""}
                />
              )}
            />
            {errors.orderDate && <p className="error-message">{errors.orderDate.message}</p>}
          </div>

          <div className="form-field">
            <label>{t("form.orderTime")}</label>
            <Controller
              name="orderTime"
              control={control}
              rules={{ required: t("form.required") as string }}
              render={({ field }) => (
                <TimePicker 
                  {...field}
                  format="HH:mm"
                  style={{ width: '100%' }}
                  disabledTime={() => ({
                    disabledHours: () => {
                      const disabledHours = [];
                      // Disable all hours except 10:00-13:00 and 17:00-20:00
                      for (let i = 0; i < 24; i++) {
                        if ((i < 10 || i >= 13) && (i < 17 || i >= 20)) {
                          disabledHours.push(i);
                        }
                      }
                      // If selected date is today, disable all past hours
                      if (watchOrderDate?.isSame(dayjs(), 'day')) {
                        for (let i = 0; i < dayjs().hour(); i++) {
                          if (!disabledHours.includes(i)) {
                            disabledHours.push(i);
                          }
                        }
                      }
                      return disabledHours;
                    },
                    disabledMinutes: () => []
                  })}
                  minuteStep={15}
                  status={errors.orderTime ? "error" : ""}
                />
              )}
            />
            {errors.orderTime && <p className="error-message">{errors.orderTime.message}</p>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>{t("general.email")}</label>
            <Controller
              name="email"
              control={control}
              rules={{ 
                required: t("form.required") as string,
                validate: validateEmail
              }}
              render={({ field }) => (
                <Input 
                  {...field} 
                  placeholder={t("general.email")} 
                  status={errors.email ? "error" : ""}
                />
              )}
            />
            {errors.email && <p className="error-message">{errors.email.message}</p>}
          </div>

          <div className="form-field">
            <label>{t("form.participantNumber")}</label>
            <Controller
              name="participantNumber"
              control={control}
              rules={{ required: t("form.required") as string }}
              render={({ field }) => (
                <InputNumber 
                  {...field}
                  min={1} 
                  placeholder={t("form.participantNumber")}
                  style={{ width: '100%' }}
                  status={errors.participantNumber ? "error" : ""}
                />
              )}
            />
            {errors.participantNumber && <p className="error-message">{errors.participantNumber.message}</p>}
          </div>
        </div>

        <div className="form-field">
          <label>{t("form.comment")}</label>
          <Controller
            name="notes"
            control={control}
            render={({ field }) => (
              <Input.TextArea 
                {...field}
                rows={5} 
                placeholder={t("form.comment")}
              />
            )}
          />
        </div>

        <div className="form-submit">
          <Button
            className="submit-btn"
            type="primary"
            htmlType="submit"
            disabled={loading || !isTimeValid}
            style={{ width: '100%', height: '46px', borderRadius: '20px' }}
          >
            {loading ? (
              <Space>
                <Spin size="small" />
                {t("form.send")}
              </Space>
            ) : (
              t("form.send")
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrderFormComponent;
