import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const questionFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  question: z.string().min(10, {
    message: "Please enter a question with at least 10 characters.",
  }),
});

type QuestionFormValues = z.infer<typeof questionFormSchema>;

const QuestionForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      name: "",
      email: "",
      question: "",
    },
  });

  const onSubmit = (data: QuestionFormValues) => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast("Question Submitted", {
        description: `Thank you, ${data.name}. We have received your question and will get back to you soon.`,
      });

      // Reset form
      form.reset();
    }, 1500);
  };

  return (
    <div className="glass-card shadow-soft-lg p-8 animate-on-scroll">
      <div className="flex items-center space-x-3 mb-8">
        <div className="h-10 w-10 rounded-full bg-salon-pink flex items-center justify-center text-white shadow-glow-pink">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="font-display font-semibold text-2xl">
          {t("askAQuestion")}
        </h3>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-salon-text-dark font-medium">
                  {t("fullName")} <span className="text-salon-pink">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                    placeholder={t("enterName")}
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
                  {t("emailAddress")} <span className="text-salon-pink">*</span>
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
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-salon-text-dark font-medium">
                  {t("yourQuestion")} <span className="text-salon-pink">*</span>
                </FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full rounded-lg border-salon-light-pink bg-white/70 p-3 text-salon-text-dark focus:outline-none focus:ring-2 focus:ring-salon-pink/50 transition-all"
                    placeholder={t("enterYourQuestion")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={loading} className="btn-primary">
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
              t("submitQuestion")
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default QuestionForm;