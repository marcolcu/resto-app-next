"use client";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { useCreateTestimoni } from "@/services/useTestimoniService";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function TestimonialPage() {
  const { toast } = useToast();
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState({
    title: "",
    customer: "",
    description: "",
    active: false,
  });

  const { postTestimoni, testimoni, testimoniError } = useCreateTestimoni();

  useEffect(() => {
    if (testimoni) {
      setSubmitted(true);
      toast({
        title: "Testimonial Submitted",
        description: "Thank you for sending us your testimonial.",
      });
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else if (testimoniError) {
      toast({
        variant: "destructive",
        title: "Oops, something went wrong.",
        description: testimoniError?.message,
      });
    }
  }, [testimoni, testimoniError]);

  const handleSubmitTestimoni = () => {
    postTestimoni({
      body: {
        title: data.title,
        customer: data.customer,
        description: data.description,
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen py-12">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Thank You for Your Testimonial!
          </h2>
        </div>
      ) : (
        <Card className="max-w-2xl mx-auto p-6 sm:p-8">
          <div className="flex items-center justify-center mb-6">
            <h2 className="text-2xl font-bold">Share Your Testimonial</h2>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="customer">Your Name</Label>
                <Input
                  id="customer"
                  placeholder="John Doe"
                  value={data.customer}
                  onChange={handleChange} // Handle change for the name input
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Very Recommended!"
                  value={data.title}
                  onChange={handleChange} // Handle change for the title input
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Testimonial</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Share your thoughts..."
                value={data.description}
                onChange={handleChange} // Handle change for the testimonial textarea
              />
            </div>
            <Button onClick={handleSubmitTestimoni} className="w-full">
              Submit Testimonial
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}
