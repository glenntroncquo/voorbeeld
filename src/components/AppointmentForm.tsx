import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  Calendar as CalendarIcon,
  Clock,
  Scissors,
  CheckCircle2,
  CalendarClock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  parse,
  isSameMonth,
  isSameDay,
  isToday,
  isAfter,
  isBefore,
  addDays,
  setHours,
} from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { companyId } from "@/integrations/company_id";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  treatment: z.string({
    required_error: "Please select a treatment.",
  }),
  option: z.number({
    required_error: "Please select a pricing option.",
  }),
  date: z.date(),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Function to fetch treatments from Supabase
const fetchTreatments = async () => {
  const { data, error } = await supabase
    .from("treatment")
    .select(
      "id, name, pricing_options, specialization_treatment(specialization_id)"
    )
    .eq("company_id", companyId);
  if (error) {
    console.error("Error fetching treatments:", error);
    return [];
  }
  return data;
};

// Update treatments structure to include an id for each option
const treatments = [
  {
    id: "haircut",
    name: "Haircuts & Styling",
    options: [
      { id: "basic_cut", name: "Basic Cut", price: 45 },
      { id: "premium_cut", name: "Premium Cut & Style", price: 65 },
      { id: "deluxe_cut", name: "Deluxe Cut, Wash & Style", price: 85 },
    ],
  },
  {
    id: "coloring",
    name: "Hair Coloring",
    options: [
      { id: "roots_touchup", name: "Roots Touch-up", price: 75 },
      { id: "full_color", name: "Full Color", price: 120 },
      { id: "highlights", name: "Highlights/Balayage", price: 150 },
    ],
  },
  {
    id: "treatments",
    name: "Hair Treatments",
    options: [
      { id: "moisture_treatment", name: "Moisture Treatment", price: 60 },
      { id: "keratin_treatment", name: "Keratin Treatment", price: 150 },
      { id: "scalp_treatment", name: "Scalp Treatment", price: 85 },
    ],
  },
];

// Define weekday labels
const weekdayLabels = {
  en: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
  nl: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za"],
  fr: ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"],
};

// Month names for different languages
const monthNames = {
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  nl: [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ],
  fr: [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ],
};

// Time slots
const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
];

// Add types for the availability data
type TimeSlot = {
  staff_id: string;
  start_time: string;
  end_time: string;
  available_start: string;
  available_end: string;
};

type DayAvailability = {
  dayName: string;
  slots: TimeSlot[];
};

type Availabilities = {
  dates: {
    [key: string]: DayAvailability;
  };
};

const AppointmentForm = () => {
  const { t, i18n } = useTranslation();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTreatment, setSelectedTreatment] = useState<string | null>(
    null
  );
  const [treatments, setTreatments] = useState([]);
  const [availabilities, setAvailabilities] = useState<Availabilities>({
    dates: {},
  });
  const [fetchingAvailabilities, setFetchingAvailabilities] = useState(false);

  const currentLanguage = i18n.language as keyof typeof weekdayLabels;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    const loadTreatments = async () => {
      const fetchedTreatments = await fetchTreatments();
      setTreatments(fetchedTreatments);
    };

    loadTreatments();
  }, []);

  // Function to fetch availabilities for the current month
  const fetchAvailabilities = async (month: Date, treatmentId?: string) => {
    if (!treatmentId) {
      console.log("No treatment ID provided, cannot fetch availabilities");
      return;
    }

    console.log("Fetching availabilities for:", {
      month: format(month, "yyyy-MM"),
      treatmentId,
      companyId,
    });

    setFetchingAvailabilities(true);
    try {
      const startDate = format(startOfMonth(month), "yyyy-MM-dd");

      console.log("Calling get-availabilities with:", {
        startDate,
        treatmentId,
        companyId,
      });

      const { data, error } = await supabase.functions.invoke(
        "get-availabilities",
        {
          body: {
            startDate,
            treatmentId,
            companyId,
          },
        }
      );

      if (error) {
        console.error("Error fetching availabilities:", error);
        return;
      }

      console.log("Received availabilities:", data);
      setAvailabilities(data as Availabilities);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    } finally {
      setFetchingAvailabilities(false);
    }
  };

  // Fetch availabilities when month or treatment changes
  useEffect(() => {
    if (step === 2) {
      // Force fetch when we're on the calendar step
      console.log("Step 2 active, fetching availabilities");
      fetchAvailabilities(currentMonth, selectedTreatment || undefined);
    }
  }, [currentMonth, selectedTreatment, step]);

  // Also fetch when moving to step 2
  useEffect(() => {
    if (step === 2 && selectedTreatment) {
      console.log("Moving to calendar step, fetching availabilities");
      fetchAvailabilities(currentMonth, selectedTreatment);
    }
  }, [step]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
      // Find the selected treatment and option to display in confirmation
      const treatment = treatments.find((t) => t.id === data.treatment);
      const option = treatment?.pricing_options?.find(
        (o) => o.price === data.option
      );

      if (!treatment || !option || !data.date || !data.time) {
        throw new Error("Missing required booking information");
      }

      // Parse the selected date and time
      const dateStr = format(data.date, "yyyy-MM-dd");
      const startDateTime = `${dateStr}T${data.time}:00`;

      // Calculate end time based on duration (assuming duration is in minutes)
      const duration = option.duration || 60; // Default to 60 minutes if not specified
      const startDate = new Date(startDateTime);
      const endDate = new Date(startDate.getTime() + duration * 60000);
      const endDateTime = format(endDate, "yyyy-MM-dd'T'HH:mm:ss");

      // Get staff ID from the time slot (using the first available staff for that time)
      const dateKey = format(data.date, "yyyy-MM-dd");
      const timeSlot = availabilities.dates[dateKey]?.slots.find(
        (slot) => slot.start_time === data.time
      );

      const staffId = timeSlot?.staff_id;

      if (!staffId) {
        throw new Error("Could not determine staff for booking");
      }

      console.log("Booking appointment with:", {
        start: startDateTime,
        end: endDateTime,
        staffId,
        companyId,
        treatmentId: data.treatment,
        price: data.option,
        duration,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        notes: data.message || "",
      });

      // Call the book-appointment edge function
      const { data: bookingResult, error } = await supabase.functions.invoke(
        "book-appointment",
        {
          body: {
            start: startDateTime,
            end: endDateTime,
            staffId,
            companyId,
            treatmentId: data.treatment,
            price: data.option,
            duration,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            notes: data.message || "",
          },
        }
      );

      if (error) {
        throw new Error(`Error booking appointment: ${error.message}`);
      }

      console.log("Booking successful:", bookingResult);

      toast("Appointment Confirmed", {
        description: `Your appointment for ${treatment.name} (${
          option.name
        }) on ${format(data.date, "MMMM d, yyyy")} at ${
          data.time
        } has been scheduled.`,
        icon: <CheckCircle2 className="text-green-500" />,
      });

      // Reset form
      form.reset();
      setStep(1);
      setSelectedDate(null);
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast("Booking Failed", {
        description:
          error instanceof Error
            ? error.message
            : "Could not book appointment. Please try again.",
        icon: <div className="h-5 w-5 text-red-500">❌</div>,
      });
    } finally {
      setLoading(false);
    }
  };

  const selectedTreatmentOptions =
    treatments.find((t) => t.id === form.watch("treatment"))?.pricing_options ||
    [];

  // Update calendar navigation functions
  const prevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  const nextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
  };

  // Generate calendar days for the current month view
  const generateCalendarDays = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const startDate = monthStart;
    const endDate = monthEnd;

    const days = eachDayOfInterval({ start: startDate, end: endDate });

    // Add days from previous month to fill the first row
    const firstDayOfMonth = getDay(monthStart);
    const prevMonthDays = [];

    for (let i = firstDayOfMonth; i > 0; i--) {
      prevMonthDays.push(addDays(monthStart, -i));
    }

    // Add days from next month to fill the last row
    const lastDayOfMonth = getDay(monthEnd);
    const nextMonthDays = [];

    for (let i = 1; i < 7 - lastDayOfMonth; i++) {
      nextMonthDays.push(addDays(monthEnd, i));
    }

    return [...prevMonthDays, ...days, ...nextMonthDays];
  };

  // Update isDayDisabled to use availabilities
  const isDayDisabled = (day: Date) => {
    // Past days are disabled
    if (isBefore(day, new Date()) && !isToday(day)) {
      return true;
    }

    // Check if the day has any available slots
    const dateKey = format(day, "yyyy-MM-dd");
    return !availabilities.dates[dateKey];
  };

  // Handle day selection
  const handleDaySelect = (day: Date) => {
    if (!isDayDisabled(day)) {
      setSelectedDate(day);
      form.setValue("date", day);
    }
  };

  // Update getAvailableTimeSlots to use availabilities
  const getAvailableTimeSlots = (date: Date | null) => {
    if (!date) return [];

    const dateKey = format(date, "yyyy-MM-dd");
    const dayAvailability = availabilities.dates[dateKey];

    if (!dayAvailability) return [];

    // Return unique start times
    return [
      ...new Set(dayAvailability.slots.map((slot) => slot.start_time)),
    ].sort();
  };

  const renderCalendar = () => {
    const days = generateCalendarDays();
    const weekdays = weekdayLabels[currentLanguage] || weekdayLabels.en;
    const monthName =
      monthNames[currentLanguage][currentMonth.getMonth()] ||
      monthNames.en[currentMonth.getMonth()];

    return (
      <div className="w-full bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-medium">
            {monthName} {currentMonth.getFullYear()}
          </h2>
          <div className="flex items-center space-x-2">
            {fetchingAvailabilities && (
              <span className="text-sm text-gray-500">Loading...</span>
            )}
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                className="h-8 w-8 rounded-full"
                aria-label={t("previousMonth")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                className="h-8 w-8 rounded-full"
                aria-label={t("nextMonth")}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Weekday headers */}
          {weekdays.map((weekday, index) => (
            <div
              key={`weekday-${index}`}
              className="h-10 flex items-center justify-center text-sm font-medium text-gray-500"
            >
              {weekday}
            </div>
          ))}

          {/* Calendar days */}
          {days.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isSelected = selectedDate
              ? isSameDay(day, selectedDate)
              : false;
            const isDisabled = isDayDisabled(day);
            const isTodayDate = isToday(day);

            return (
              <button
                key={`day-${idx}`}
                onClick={() => handleDaySelect(day)}
                disabled={isDisabled}
                className={cn(
                  "h-10 rounded-md flex items-center justify-center text-sm relative",
                  !isCurrentMonth && "text-gray-300",
                  isDisabled && "cursor-not-allowed opacity-50",
                  !isDisabled &&
                    isCurrentMonth &&
                    !isSelected &&
                    "hover:bg-gray-100",
                  isSelected &&
                    "bg-salon-pink text-white hover:bg-salon-pink-dark",
                  isTodayDate && !isSelected && "text-salon-pink font-bold"
                )}
                aria-label={format(day, "MMMM d, yyyy")}
              >
                {day.getDate()}
                {/* Indicator for available appointments */}
                {!isDisabled && isCurrentMonth && !isSelected && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-salon-pink"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Time slots for selected date */}
        {selectedDate && (
          <div className="mt-6">
            <h3 className="text-md font-medium mb-3">
              {t("availableTimesFor")} {format(selectedDate, "d MMMM")}:
            </h3>
            {fetchingAvailabilities ? (
              <div className="text-center py-4">
                <span className="text-salon-text-medium">
                  Loading time slots...
                </span>
              </div>
            ) : getAvailableTimeSlots(selectedDate).length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {getAvailableTimeSlots(selectedDate).map((time) => (
                  <button
                    key={time}
                    onClick={() => form.setValue("time", time)}
                    className={cn(
                      "text-center py-2 border rounded-md transition-colors",
                      form.watch("time") === time
                        ? "bg-salon-pink text-white border-salon-pink"
                        : "bg-white hover:bg-salon-softer-pink border-salon-light-pink"
                    )}
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <span className="text-salon-text-medium">
                  No available time slots for this date
                </span>
              </div>
            )}

            {/* Debug info - remove this in production */}
            {process.env.NODE_ENV !== "production" && (
              <div className="mt-4 p-2 bg-gray-100 text-xs overflow-auto max-h-32 rounded">
                <pre>
                  Selected date:{" "}
                  {selectedDate ? format(selectedDate, "yyyy-MM-dd") : "none"}
                </pre>
                <pre>
                  Available dates:{" "}
                  {Object.keys(availabilities.dates).join(", ") || "none"}
                </pre>
                <pre>Treatment: {selectedTreatment || "none"}</pre>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass-card shadow-soft-lg p-8 animate-on-scroll">
      <div className="flex items-center space-x-3 mb-8">
        <div className="h-10 w-10 rounded-full bg-salon-pink flex items-center justify-center text-white shadow-glow-pink">
          <Scissors size={16} />
        </div>
        <h3 className="font-display font-semibold text-2xl">
          {t("bookYourAppointment")}
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="treatment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-text-dark font-medium">
                        {t("selectTreatment")}{" "}
                        <span className="text-salon-pink">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedTreatment(value);
                          // Reset option when treatment changes
                          form.setValue("option", 0);
                        }}
                        value={field.value}
                      >
                        <SelectTrigger className="w-full border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:ring-salon-pink/50">
                          <SelectValue placeholder={t("chooseTreatment")} />
                        </SelectTrigger>
                        <SelectContent>
                          {treatments.map((treatment) => (
                            <SelectItem key={treatment.id} value={treatment.id}>
                              {treatment.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedTreatment && (
                  <FormField
                    control={form.control}
                    name="option"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormLabel className="text-salon-text-dark font-medium">
                          {t("selectOption")}{" "}
                          <span className="text-salon-pink">*</span>
                        </FormLabel>
                        <RadioGroup
                          onValueChange={(value) =>
                            field.onChange(Number(value))
                          }
                          value={field.value?.toString()}
                          className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                          {selectedTreatmentOptions.map((option) => (
                            <FormItem
                              key={option.price}
                              className="cursor-pointer"
                            >
                              <FormControl>
                                <RadioGroupItem
                                  value={option.price.toString()}
                                  className="hidden peer"
                                  id={option.price.toString()}
                                />
                              </FormControl>
                              <FormLabel
                                htmlFor={option.price.toString()}
                                className="flex flex-col p-4 border border-salon-light-pink rounded-lg cursor-pointer transition-all duration-200 hover:border-salon-pink peer-data-[state=checked]:border-salon-pink peer-data-[state=checked]:bg-salon-softer-pink"
                              >
                                <span className="font-medium">
                                  {option.name}
                                </span>
                                <span className="text-salon-pink font-semibold mt-2">
                                  ${option.price}
                                </span>
                              </FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <Button
                type="button"
                onClick={() => setStep(2)}
                disabled={!form.watch("treatment") || !form.watch("option")}
                className="btn-primary w-full"
              >
                {t("continueToSchedule")}
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <FormField
                  control={form.control}
                  name="date"
                  render={() => (
                    <FormItem>
                      <FormLabel className="text-salon-text-dark font-medium">
                        {t("selectDateAndTime")}{" "}
                        <span className="text-salon-pink">*</span>
                      </FormLabel>
                      <FormControl>
                        <div className="mt-2">{renderCalendar()}</div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="glass-card p-5 bg-white/80">
                  <div className="flex items-center space-x-2 mb-3">
                    <CalendarClock className="text-salon-pink" size={18} />
                    <h4 className="font-medium text-salon-text-dark">
                      {t("selectedAppointment")}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm text-salon-text-medium">
                    {form.watch("treatment") && (
                      <p>
                        <span className="font-medium">{t("treatment")}: </span>
                        {
                          treatments.find(
                            (t) => t.id === form.watch("treatment")
                          )?.name
                        }
                      </p>
                    )}
                    {form.watch("option") && form.watch("treatment") && (
                      <p>
                        <span className="font-medium">{t("option")}: </span>
                        {
                          treatments
                            .find((t) => t.id === form.watch("treatment"))
                            ?.pricing_options?.find(
                              (o) => o.price === form.watch("option")
                            )?.name
                        }{" "}
                        (
                        <span className="text-salon-pink font-medium">
                          ${form.watch("option")}
                        </span>
                        )
                      </p>
                    )}
                    {form.watch("date") && (
                      <p>
                        <span className="font-medium">{t("date")}: </span>
                        {format(form.watch("date"), "MMMM d, yyyy")}
                      </p>
                    )}
                    {form.watch("time") && (
                      <p>
                        <span className="font-medium">{t("time")}: </span>
                        {form.watch("time")}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="border-salon-pink text-salon-pink hover:bg-salon-softer-pink"
                >
                  {t("back")}
                </Button>
                <Button
                  type="button"
                  onClick={() => setStep(3)}
                  disabled={!form.watch("date") || !form.watch("time")}
                  className="btn-primary"
                >
                  {t("continueToDetails")}
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-text-dark font-medium">
                        {t("firstName")}{" "}
                        <span className="text-salon-pink">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                          placeholder={t("enterFirstName")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-text-dark font-medium">
                        {t("lastName")}{" "}
                        <span className="text-salon-pink">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                          placeholder={t("enterLastName")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-text-dark font-medium">
                        {t("emailAddress")}{" "}
                        <span className="text-salon-pink">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                          placeholder={t("enterEmail")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-salon-text-dark font-medium">
                        {t("phoneNumber")}{" "}
                        <span className="text-salon-pink">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                          placeholder={t("enterPhone")}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-salon-text-dark font-medium">
                      {t("specialRequests")} ({t("optional")})
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        rows={4}
                        className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                        placeholder={t("anySpecialRequests")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => setStep(2)}
                  variant="outline"
                  className="border-salon-pink text-salon-pink hover:bg-salon-softer-pink"
                >
                  {t("back")}
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin mr-2 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {t("processing")}
                    </span>
                  ) : (
                    t("confirmAppointment")
                  )}
                </Button>
              </div>
            </div>
          )}

          <p className="text-center text-sm text-salon-text-medium">
            {t("byBooking")}{" "}
            <a href="#" className="text-salon-pink underline">
              {t("termsOfService")}
            </a>{" "}
            {t("and")}{" "}
            <a href="#" className="text-salon-pink underline">
              {t("privacyPolicy")}
            </a>
            .
          </p>
        </form>
      </Form>
    </div>
  );
};

export default AppointmentForm;
