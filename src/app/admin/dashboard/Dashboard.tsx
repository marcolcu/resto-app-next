import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import React from "react";

export const Dashboard = () => {
    return (
        <main className="flex-1 p-4 sm:p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Total Revenue</CardTitle>
                        <CardDescription>The total revenue generated this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">$125,000</div>
                        <div className="text-sm text-muted-foreground">+12% from last month</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>New Users</CardTitle>
                        <CardDescription>The number of new users registered this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">1,234</div>
                        <div className="text-sm text-muted-foreground">+5% from last month</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Orders</CardTitle>
                        <CardDescription>The total number of orders placed this month.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-bold">2,345</div>
                        <div className="text-sm text-muted-foreground">+8% from last month</div>
                    </CardContent>
                </Card>
                <Card className="col-span-1 md:col-span-2 lg:col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                        <CardDescription>A list of the most recent orders placed on your store.</CardDescription>
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
                                <TableRow>
                                    <TableCell>#12345</TableCell>
                                    <TableCell>John Doe</TableCell>
                                    <TableCell>2023-04-15</TableCell>
                                    <TableCell>$99.99</TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">Pending</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoveHorizontalIcon className="h-4 w-4"/>
                                                    <span className="sr-only">Order actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>#12346</TableCell>
                                    <TableCell>Jane Smith</TableCell>
                                    <TableCell>2023-04-14</TableCell>
                                    <TableCell>$49.99</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Shipped</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoveHorizontalIcon className="h-4 w-4"/>
                                                    <span className="sr-only">Order actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>#12347</TableCell>
                                    <TableCell>Bob Johnson</TableCell>
                                    <TableCell>2023-04-13</TableCell>
                                    <TableCell>$79.99</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">Delivered</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoveHorizontalIcon className="h-4 w-4"/>
                                                    <span className="sr-only">Order actions</span>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>View Order</DropdownMenuItem>
                                                <DropdownMenuItem>Edit Order</DropdownMenuItem>
                                                <DropdownMenuItem>Cancel Order</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
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
    )
}