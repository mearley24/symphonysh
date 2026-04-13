
import { PageLayout } from "./PageLayout";
import { BackNavigation } from "@/components/scheduling/BackNavigation";
import { useAppointmentData } from "./confirmation/useAppointmentData";
import { AppointmentDetails } from "./confirmation/AppointmentDetails";
import { ZapierNotifier } from "./confirmation/ZapierNotifier";

export function ConfirmationPage() {
  // Get appointment details using our custom hook
  const appointmentDetails = useAppointmentData();
  
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto p-6 rounded-lg">
        <BackNavigation />
        
        <div className="text-center space-y-6 mt-8 animate-fade-up text-white">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-white">Appointment Confirmed</h1>
            
            <AppointmentDetails appointmentDetails={appointmentDetails} />
          </div>
        </div>
        
        {/* Non-visual component that handles Zapier notification */}
        <ZapierNotifier appointmentDetails={appointmentDetails} />
      </div>
    </PageLayout>
  );
}
