
import { useLocation, Link } from "react-router-dom";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Phone, Mail, MessageSquare, Clock } from "lucide-react";
import { PageLayout } from "./PageLayout";
import { SERVICES } from "@/components/scheduling/AppointmentForm";
import { useEffect } from "react";

interface AppointmentDetails {
  date?: Date;
  selectedTime?: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export function ConfirmationPage() {
  const location = useLocation();
  const appointmentDetails = location.state?.appointmentDetails as AppointmentDetails;

  useEffect(() => {
    console.log("Confirmation page rendered");
    console.log("Location state:", location.state);
    console.log("Appointment details:", appointmentDetails);
  }, [location.state, appointmentDetails]);

  // Get service name from service ID
  const getServiceName = (serviceId: string): string => {
    return SERVICES.find(s => s.id === serviceId)?.name || serviceId;
  };

  if (!appointmentDetails) {
    console.log("No appointment details found in location state");
    
    return (
      <PageLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-white mb-4">No appointment details found</h2>
          <p className="text-gray-300 mb-6">
            Please return to the scheduling page to book your appointment.
          </p>
          <Button asChild>
            <Link to="/scheduling">Return to Scheduling</Link>
          </Button>
        </div>
      </PageLayout>
    );
  }

  const { date, selectedTime, name, email, phone, service, message } = appointmentDetails;
  
  const formattedDate = date ? format(new Date(date), "EEEE, MMMM d, yyyy") : "Unknown date";
  const serviceName = service ? getServiceName(service) : "Consultation";

  console.log("Rendering confirmation with:", { formattedDate, serviceName, name, email });

  return (
    <PageLayout>
      <div className="max-w-2xl mx-auto">
        <Card className="border-white/10 bg-white/5 backdrop-blur-sm text-white">
          <CardHeader className="border-b border-white/10 pb-6">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Appointment Confirmed!
            </CardTitle>
            <CardDescription className="text-gray-300 text-base">
              Thank you for scheduling a consultation with Symphony Smart Homes
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Appointment Details</h3>
                <div className="space-y-3 ml-1">
                  <div className="flex items-start gap-2 text-gray-300">
                    <Calendar className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>{formattedDate}</div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <Clock className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>{selectedTime || "Time not specified"}</div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <div className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>Service: {serviceName}</div>
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <h3 className="text-lg font-medium text-white mb-2">Your Information</h3>
                <div className="space-y-3 ml-1">
                  <div className="flex items-start gap-2 text-gray-300">
                    <div className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>{name}</div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>{email}</div>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300">
                    <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                    <div>{phone}</div>
                  </div>
                  {message && (
                    <div className="flex items-start gap-2 text-gray-300">
                      <MessageSquare className="h-4 w-4 mt-1 flex-shrink-0" />
                      <div>{message}</div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-white/10 p-4 rounded-md mt-4">
                <p className="text-gray-200">
                  We've received your appointment request and will be in touch shortly to confirm your consultation. 
                  If you need to make any changes, please contact us directly.
                </p>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="border-t border-white/10 pt-6 flex justify-center">
            <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </PageLayout>
  );
}
