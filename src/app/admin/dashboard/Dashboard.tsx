"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { useGetProfit } from "@/services/useProfitService";
import { useAppContext } from "@/app/provider";
import { useGetReservations } from "@/services/useReservationService";

export const Dashboard = () => {
  const { state } = useAppContext();
  const [isClient, setIsClient] = useState(false);
  const { fetchProfit, getProfit } = useGetProfit();
  const { fetchReservations, getReservations } = useGetReservations();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsClient(true);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      fetchData();
    }
  }, [isClient]);

  const fetchData = () => {
    fetchProfit({
      header: {
        Authorization: "Bearer " + state?.token,
      },
    });
    fetchReservations({
        header: {
          Authorization: "Bearer " + state?.token,
        },
      });
  };

  // Fungsi untuk memformat angka ke dalam format mata uang Indonesia
  const formatCurrency = (value: number) => {
    if (value === null) return "0"; // Menghindari null, bisa diubah sesuai kebutuhan
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0, // Tidak ada desimal
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Menghitung persentase perubahan
  const calculatePercentageChange = (current: number, last: number) => {
    if (last === null || last === 0) return "N/A"; // Atau bisa diatur untuk menampilkan "-" atau 0%
    const change = ((current - last) / last) * 100;
    return change.toFixed(2) + "%"; // Menampilkan dua desimal
  };
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num);
  };

  const totalCurrentMonth = getProfit?.total_current_month || 0;
  const totalLastMonth = getProfit?.total_last_month;

  return (
    <main className="flex-1 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>
              The total revenue generated this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {formatCurrency(totalCurrentMonth)}
            </div>
            {totalLastMonth !== null && (
              <div className="text-sm text-muted-foreground">
                {calculatePercentageChange(totalCurrentMonth, totalLastMonth)}{" "}
                from last month
              </div>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Users</CardTitle>
            <CardDescription>
              The number of new users registered this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">
              {formatNumber(getProfit?.upcoming_reservations)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              The total number of orders placed this month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2,345</div>
            <div className="text-sm text-muted-foreground">
              +8% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              A list of the most recent orders placed on your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {getReservations?.reservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center">
                      No reservations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  getReservations?.reservations
                    .sort(
                      (a: any, b: any) =>
                        new Date(b.created_at).getTime() -
                        new Date(a.created_at).getTime()
                    ) // Sort descending
                    .slice(0, 5) // Get the first 5
                    .map((reservation: any) => {
                      // Calculate the total for the reservation
                      const total = reservation.reservation_details.reduce(
                        (acc: any, detail: any) => {
                          // Placeholder for actual menu price fetching logic
                          const menuPrice = 10; // Replace with actual menu price logic
                          return acc + menuPrice * detail.quantity; // Assuming menu price is fetched
                        },
                        0
                      );

                      return (
                        <TableRow key={reservation.id}>
                          <TableCell>#{reservation.id}</TableCell>
                          <TableCell>{reservation.name}</TableCell>
                          <TableCell>
                            {new Date(
                              reservation.reserve_time
                            ).toLocaleString()}
                          </TableCell>
                          <TableCell>${total.toFixed(2)}</TableCell>
                          <TableCell>
                            <Badge variant="secondary">Upcoming</Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoveHorizontalIcon className="h-4 w-4" />
                                  <span className="sr-only">Order actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Cancel Order
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

function MoveHorizontalIcon(props: any) {
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
      <polyline points="18 8 22 12 18 16" />
      <polyline points="6 8 2 12 6 16" />
      <line x1="2" x2="22" y1="12" y2="12" />
    </svg>
  );
}
