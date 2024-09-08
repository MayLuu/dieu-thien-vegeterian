"use server";
import { sendMail } from "@/lib/sendMail";

const loadLocale = {
  "vi": {
    "subject": "XÁC NHẬN THÔNG TIN ĐẶT BÀN",
    "greeting": "Thân gửi quí khách hàng <strong>{userName}</strong>,",
    "body": "Chúng tôi đã nhận được thông tin đặt bàn của bạn tại nhà hàng Diệu Thiện. Cảm ơn bạn đã quan tâm và liên hệ với chúng tôi.",
    "listTitle": "Dưới đây là thông tin bạn đã cung cấp:",
    "nameLabel": "Tên khách hàng",
    "phoneLabel": "Điện thoại",
    "reservationLabel": "Ngày đặt bàn",
    "participantNumber": "Số lượng khách",
    "notesLabel": "Ghi chú",
    "footer1": "Hiện tại, chúng tôi đang xem xét và xác nhận yêu cầu của bạn. Chúng tôi sẽ liên hệ lại với bạn trong thời gian sớm nhất để xác nhận tình trạng đặt bàn và cung cấp thông tin chi tiết về chỗ ngồi.",
    "footer2": "Nếu bạn có bất kỳ câu hỏi nào hoặc cần thay đổi thông tin đặt bàn, xin vui lòng trả lời email này hoặc gọi đến số điện thoại <strong>{phoneNumber}</strong>.",
    "footer3": "Cảm ơn bạn đã chọn Diệu Thiện. Chúng tôi rất mong có cơ hội được phục vụ bạn.",
    "regards": "Trân trọng,<br/>Nhà hàng Diệu Thiện"
  },
  "en": {
    "subject": "ACKNOWLEDGMENT OF YOUR RESERVATION REQUEST",
    "greeting": "Dear <strong>{userName}</strong>,",
    "body": "Thank you for your reservation request at Dieu Thien. We have received your information and appreciate your interest in dining with us.",
    "listTitle": "Here are the details you provided:",
    "nameLabel": "Name",
    "phoneLabel": "Phone",
    "reservationLabel": "Reservation Date",
    "participantNumber": "Number of guests",
    "notesLabel": "Notes",
    "footer1": "We are currently reviewing and processing your request. We will get back to you as soon as possible to confirm the reservation and provide you with further details about your seating.",
    "footer2": "If you have any questions or need to make changes to your reservation, please reply to this email or call us at <strong>{phoneNumber}</strong>.",
    "footer3": "Thank you for choosing Dieu Thien. We look forward to the opportunity to serve you.",
    "regards": "Best regards,<br/>Diệu Thiện Restaurant"
  },
  "zh": {
    "subject": "确认您的预订请求",
    "greeting": "亲爱的 <strong>{userName}</strong>,",
    "body": "感谢您选择 Diệu Thiện 餐厅。我们很高兴确认您的餐桌预订，详情如下：",
    "listTitle": "以下是您提供的详细信息:",
    "nameLabel": "姓名",
    "phoneLabel": "电话",
    "reservationLabel": "预订日期",
    "participantNumber": "来宾人数",
    "notesLabel": "备注",
    "footer1": "我们正在审查并处理您的请求。我们会尽快与您联系，确认预订情况，并提供进一步的座位信息。",
    "footer2": "如果您有任何问题或需要更改预订信息，请回复此邮件或拨打<strong>{phoneNumber}</strong>与我们联系。",
    "footer3": "感谢您选择 Diệu Thiện。我们期待有机会为您服务。",
    "regards": "此致,<br/>Diệu Thiện 餐厅"
  },
  "user": {
    "subject": "[THÔNG BÁO ĐẶT BÀN] KHÁCH HÀNG {userName} VỪA ĐẶT BÀN",
    "greeting": "Chào nhà hàng Diệu Thiện, vừa có một khách hàng tin tưởng đặt hàng dịch vụ của bạn.",
    "body": "Thông tin đặt hàng của khách hàng bao gồm: ",
    "listTitle": "",
    "nameLabel": "Tên",
    "phoneLabel": "Điện thoại",
    "reservationLabel": "Ngày đặt bàn",
    "participantNumber": "Số khách tham dự",
    "notesLabel": "Ghi chú",
    "footer": "Hãy phản hồi ngay với khách hàng nếu có sự thay đổi trong việc đặt bàn.",
    "footer1": "",
    "footer2": "",
    "footer3": "",
    "regards": "Trân trọng,<br/>Nhà hàng Diệu Thiện"
  },

} as const;

type Locale = keyof typeof loadLocale;

export const send = async (formData: FormData, locale: Locale) => {
  try {
    const template = loadLocale[locale];
    const userTemplate = loadLocale['user']

    const data = {
      to: formData.get('email') as string,
      name: formData.get('userName') as string,
      subject: template.subject,
      body: `
        <html>
        <body>
          <h2 style="text-align: center;">${template.subject}</h2>
          <p style="text-transform: uppercase;">${template.greeting.replace("{userName}", formData.get('userName') as string)}</p>
          <p>${template.body}</p>
          <p>${template.listTitle}</p>
          <ul>
            <li><strong>${template.nameLabel}:</strong> ${formData.get('userName')}</li>
            <li><strong>${template.phoneLabel}:</strong> ${formData.get('phone')}</li>
            <li><strong>${template.reservationLabel}:</strong> ${formData.get('orderDate')} ${formData.get('orderTime')}</li>
            <li><strong>${template.participantNumber}:</strong> ${formData.get('participantNumber')}</li>
            <li><strong>${template.notesLabel}:</strong> ${formData.get('notes')}</li>
          </ul>
          <p>${template.footer1}</p>
          <p>${template.footer2.replace("{phoneNumber}", "085-677-9886")} </p>
          <p>${template.footer3}</p>
          <p>${template.regards}</p>
        </body>
        </html>
      `,
    };
    const userData = {
      to: 'amthucchaydieuthien@gmail.com',
      name: formData.get('userName') as string,
      subject: `${userTemplate.subject?.replace("{userName}", formData.get('userName') as string) as string}`,
      body: `
        <html>
        <body>
          <h4 style="text-align: center;">${userTemplate.subject.replace("{userName}", formData.get('userName') as string)}</h4>
          <p>${userTemplate.greeting.replace("{userName}", formData.get('userName') as string)}</p>
          <p>${userTemplate.body}</p>
          <ul>
            <li><strong>${userTemplate.nameLabel}:</strong> ${formData.get('userName')}</li>
            <li><strong>${userTemplate.phoneLabel}:</strong> ${formData.get('phone')}</li>
            <li><strong>${userTemplate.reservationLabel}:</strong> ${formData.get('orderDate')} ${formData.get('orderTime')}</li>
            <li><strong>${userTemplate.participantNumber}:</strong> ${formData.get('participantNumber')}</li>
            <li><strong>${userTemplate.notesLabel}:</strong> ${formData.get('notes')}</li>
          </ul>
          <p>${userTemplate.footer}</p>
          <p>${userTemplate.regards}</p>
        </body>
        </html>
      `,
    };

    await sendMail(data);
    await sendMail(userData)

    return { success: true };
  } catch (error) {
    console.error("Error in sendEmailAction:", error);
    return { success: false, error: error };
  }
};
