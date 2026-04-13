
import { FormEvent, ReactNode } from "react";
import { DateTimeSelector } from "@/components/scheduling/DateTimeSelector";
import { AppointmentForm } from "@/components/scheduling/AppointmentForm";
import { SubmitButton } from "./scheduling-form/SubmitButton";

interface FormLayoutProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  phone: string;
  setPhone: (phone: string) => void;
  address: string;
  setAddress: (address: string) => void;
  message: string;
  setMessage: (message: string) => void;
  service: string;
  setService: (service: string) => void;
  isSubmitting: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export function FormLayout({
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
  onSubmit
}: FormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="w-full">
            <DateTimeSelector
              date={date}
              setDate={setDate}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
            />
          </div>
        </div>

        <AppointmentForm
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          message={message}
          setMessage={setMessage}
          service={service}
          setService={setService}
        />
      </div>

      <SubmitButton isSubmitting={isSubmitting} />
    </form>
  );
}
