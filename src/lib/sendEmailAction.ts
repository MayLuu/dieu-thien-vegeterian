"use server";
import { sendMail } from "@/lib/sendMail";

const loadLocale = {
  "vi": {
    "subject": "[ĐẶT BÀN] XÁC NHẬN ĐẶT BÀN",
    "greeting": "Kính gửi {userName},",
    "body": "Cảm ơn bạn đã chọn Nhà hàng Diệu Thiện. Chúng tôi xin vui mừng xác nhận đặt bàn của bạn với các chi tiết sau:",
    "nameLabel": "Tên",
    "phoneLabel": "Điện thoại",
    "reservationLabel": "Ngày đặt bàn",
    "participantNumber": "Số khách tham dự",
    "notesLabel": "Ghi chú",
    "footer": "Chúng tôi mong được phục vụ bạn tại nhà hàng của chúng tôi. Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ thêm, xin đừng ngần ngại liên hệ với chúng tôi.",
    "regards": "Trân trọng,<br/>Nhà hàng Diệu Thiện"
  },
  "en": {
    "subject": "[ORDER] TABLE RESERVATION CONFIRMATION",
    "greeting": "Dear {userName},",
    "body": "Thank you for choosing Diệu Thiện Restaurant. We are pleased to confirm your table reservation with the following details:",
    "nameLabel": "Name",
    "phoneLabel": "Phone",
    "reservationLabel": "Reservation Date",
    "participantNumber": "Number of guests",
    "notesLabel": "Notes",
    "footer": "We look forward to serving you at our restaurant. If you have any questions or need further assistance, please do not hesitate to contact us.",
    "regards": "Best regards,<br/>Diệu Thiện Restaurant"
  },
  "zh": {
    "subject": "[订单] 餐桌预订确认",
    "greeting": "亲爱的 {userName},",
    "body": "感谢您选择 Diệu Thiện 餐厅。我们很高兴确认您的餐桌预订，详情如下：",
    "nameLabel": "姓名",
    "phoneLabel": "电话",
    "reservationLabel": "预订日期",
    "participantNumber": "来宾人数",
    "notesLabel": "备注",
    "footer": "我们期待在我们的餐厅为您服务。如果您有任何问题或需要进一步的帮助，请随时与我们联系。",
    "regards": "此致,<br/>Diệu Thiện 餐厅"
  }
} as const;

type Locale = keyof typeof loadLocale;

export const send = async (formData: FormData, locale: Locale) => {
  try {
    const template = loadLocale[locale];

    const data = {
      to: formData.get('email') as string,
      name: formData.get('userName') as string,
      subject: template.subject,
      body: `
        <html>
        <body>
          <h1 style="text-align: center;">${template.subject}</h1>
          <p>${template.greeting.replace("{userName}", formData.get('userName') as string)}</p>
          <p>${template.body}</p>
          <ul>
            <li><strong>${template.nameLabel}:</strong> ${formData.get('userName')}</li>
            <li><strong>${template.phoneLabel}:</strong> ${formData.get('phone')}</li>
            <li><strong>${template.reservationLabel}:</strong> ${formData.get('orderDate')} ${formData.get('orderTime')}</li>
            <li><strong>${template.participantNumber}:</strong> ${formData.get('participantNumber')}</li>
            <li><strong>${template.notesLabel}:</strong> ${formData.get('notes')}</li>
          </ul>
          <p>${template.footer}</p>
          <p>${template.regards}</p>
        </body>
        </html>
      `,
    };

    await sendMail(data);
    return { success: true };
  } catch (error) {
    console.error("Error in sendEmailAction:", error);
    return { success: false, error: error };
  }
};
