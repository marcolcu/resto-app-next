"use client";
import { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";


interface Reservation {
    date: string;
    time: string;
    partySize: number;
}

const reservations: Reservation[] = [
    { date: "June 1, 2023", time: "7:00 PM", partySize: 4 },
    { date: "June 2, 2023", time: "8:00 PM", partySize: 2 },
    { date: "June 3, 2023", time: "6:30 PM", partySize: 6 },
];

export function TableReservationPage() {
    const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [showConfirmationDialog, setShowConfirmationDialog] = useState<boolean>(false);

    const handleReserveClick = (reservation: Reservation) => {
        setSelectedReservation(reservation);
        setDialogOpen(true);
    };

    const handleConfirmReservation = () => {
        setDialogOpen(false); // Hide the reservation dialog
        setShowConfirmationDialog(true); // Show the confirmation dialog
    };

    const handleCloseConfirmationDialog = () => {
        setShowConfirmationDialog(false); // Close the confirmation dialog
        window.location.href = "/"; // Redirect to the home page
    };

    const handleCancelReservation = () => {
        setDialogOpen(false);
        setSelectedReservation(null); // Clear selection
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Reserve Your Table</h2>
                <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">Find the perfect time to dine with us.</p>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Party Size</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                    {reservations.map((reservation, index) => (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{reservation.date}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{reservation.time}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{reservation.partySize}</div>
                            </td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button size="sm" onClick={() => handleReserveClick(reservation)}>Reserve</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle>Reservation Confirmation</DialogTitle>
                                            <DialogDescription>Please review your reservation details.</DialogDescription>
                                        </DialogHeader>
                                        {selectedReservation && (
                                            <div className="space-y-4">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                                            Date
                                                        </label>
                                                        <div className="mt-1">
                                                            <div className="text-sm text-gray-900">{selectedReservation.date}</div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="time" className="block text-sm font-medium text-gray-700">
                                                            Time
                                                        </label>
                                                        <div className="mt-1">
                                                            <div className="text-sm text-gray-900">{selectedReservation.time}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <label htmlFor="party-size" className="block text-sm font-medium text-gray-700">
                                                        Party Size
                                                    </label>
                                                    <div className="mt-1">
                                                        <div className="text-sm text-gray-900">{selectedReservation.partySize}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <DialogFooter>
                                            <Button variant="secondary" onClick={handleCancelReservation}>Cancel</Button>
                                            <Button onClick={handleConfirmReservation}>Confirm Reservation</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmationDialog} onOpenChange={() => setShowConfirmationDialog(false)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Reservation Confirmed</DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="text-center">
                        <p className="text-lg">Thank you for your reservation!</p>
                    </DialogDescription>
                    <DialogFooter>
                        <Button onClick={handleCloseConfirmationDialog}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
