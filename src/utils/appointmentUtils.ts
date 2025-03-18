
// This file is a facade that re-exports from the new structure
// for backward compatibility
export { submitAppointment, getAvailableTimeSlots } from "./appointments";
export type { AppointmentData } from "./appointments/types";
