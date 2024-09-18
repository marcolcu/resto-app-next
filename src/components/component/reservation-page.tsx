"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useAppContext } from "@/app/provider";
import { useRouter } from "next/navigation";

export function ReservationPage() {
  const { dispatch } = useAppContext();
  const router = useRouter();

  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [time, setTime] = React.useState<string | undefined>(undefined);
  const [name, setName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [guests, setGuests] = React.useState<string>("");

  const times = [];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 13);

  for (let hour = 10; hour <= 22; hour++) {
    const fullHour = `${hour.toString().padStart(2, "0")}:00`;
    const halfHour = `${hour.toString().padStart(2, "0")}:30`;

    times.push(fullHour, halfHour);
  }

  const handleSubmit = () => {
    if (!name || !email || !phone || !date || !time || !guests) {
      alert("Please fill out all fields.");
      return;
    }

    const formattedDate = date.toLocaleDateString("en-CA");
    const formattedTime = `${time}:00`;
    const reserveTime = `${formattedDate} ${formattedTime}`;

    const reservation = {
      name,
      email,
      phone,
      reserve_time: reserveTime,
      guests,
    };

    dispatch({ reservation });

    router.push("/menu");
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex w-[100vw] justify-center">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Book Your Reservation</CardTitle>
            <CardDescription>
              Select a date and time, and the number of guests to make your
              reservation.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start font-normal ${
                        !date ?? "text-muted-foreground"
                      }`}
                    >
                      <CalendarDaysIcon className="mr-2 h-4 w-4" />
                      {date
                        ? date.toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })
                        : "Select a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < today}
                      fromDate={today}
                      toDate={endDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="time">Time</Label>
                <Select onValueChange={(value) => setTime(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time" />
                  </SelectTrigger>
                  <SelectContent>
                    {times.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="guests">Guests</Label>
                <Input
                  id="guests"
                  type="text"
                  inputMode="numeric"
                  min="1"
                  max="10"
                  placeholder="Number of guests"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                />
              </div>
            </div>
            <Button type="button" className="w-full" onClick={handleSubmit}>
              Reserve
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CalendarDaysIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}
