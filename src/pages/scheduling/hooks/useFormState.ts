
import { useState } from "react";

export function useFormState() {
  const [date, setDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [service, setService] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  return {
    date,
    setDate,
    selectedTime,
    setSelectedTime,
    name,
    setName,
    email,
    setEmail,
    phone,
    setPhone,
    address,
    setAddress,
    message,
    setMessage,
    service,
    setService,
    isSubmitting,
    setIsSubmitting
  };
}
