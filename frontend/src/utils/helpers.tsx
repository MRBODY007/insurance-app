export const getPaymentFrequencyLabel = (code: string): string => {
    const paymentFrequencies: { [key: string]: string } = {
      YEARLY: "รายปี",
      HALFYEARLY: "รายครึ่งปี",
      QUARTERLY: "ราย 3 เดือน",
      MONTHLY: "รายเดือน",
    };
    return paymentFrequencies[code] || "ไม่ทราบ";
  };
  