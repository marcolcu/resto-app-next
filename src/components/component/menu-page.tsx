"use client";
import { useState, useMemo } from "react";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";

export function MenuPage() {
    const menu = [
        {
            id: 1,
            name: "Bruschetta",
            description: "Toasted bread topped with tomatoes, garlic, and basil",
            price: 8.99,
            category: "appetizer",
            image: "/placeholder.svg",
        },
        {
            id: 2,
            name: "Caesar Salad",
            description: "Crisp romaine lettuce, croutons, and parmesan cheese",
            price: 12.99,
            category: "appetizer",
            image: "/placeholder.svg",
        },
        {
            id: 3,
            name: "Margherita Pizza",
            description: "Tomato sauce, fresh mozzarella, and basil",
            price: 16.99,
            category: "main",
            image: "/placeholder.svg",
        },
        {
            id: 4,
            name: "Spaghetti Bolognese",
            description: "Homemade meat sauce and parmesan cheese",
            price: 18.99,
            category: "main",
            image: "/placeholder.svg",
        },
        {
            id: 5,
            name: "Tiramisu",
            description: "Layers of espresso-soaked ladyfingers and mascarpone",
            price: 9.99,
            category: "dessert",
            image: "/placeholder.svg",
        },
        {
            id: 6,
            name: "Gelato",
            description: "Assorted flavors of Italian-style ice cream",
            price: 6.99,
            category: "dessert",
            image: "/placeholder.svg",
        },
        {
            id: 7,
            name: "Espresso",
            description: "A shot of rich, bold espresso",
            price: 3.99,
            category: "drink",
            image: "/placeholder.svg",
        },
        {
            id: 8,
            name: "Aperol Spritz",
            description: "Aperol, prosecco, and soda water",
            price: 12.99,
            category: "drink",
            image: "/placeholder.svg",
        },
    ];

    const [activeFilter, setActiveFilter] = useState("all");

    const filteredMenu = useMemo(() => {
        if (activeFilter === "all") {
            return menu;
        } else {
            return menu.filter((item) => item.category === activeFilter);
        }
    }, [activeFilter, menu]);

    return (
        <div className="w-full max-w-4xl mx-auto px-4 md:px-6 py-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button variant={activeFilter === "all" ? "default" : "outline"} onClick={() => setActiveFilter("all")}>
                    All
                </Button>
                <Button
                    variant={activeFilter === "appetizer" ? "default" : "outline"}
                    onClick={() => setActiveFilter("appetizer")}
                >
                    Appetizers
                </Button>
                <Button variant={activeFilter === "main" ? "default" : "outline"} onClick={() => setActiveFilter("main")}>
                    Main Courses
                </Button>
                <Button variant={activeFilter === "dessert" ? "default" : "outline"} onClick={() => setActiveFilter("dessert")}>
                    Desserts
                </Button>
                <Button variant={activeFilter === "drink" ? "default" : "outline"} onClick={() => setActiveFilter("drink")}>
                    Drinks
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredMenu.map((item) => (
                    <Card key={item.id}>
                        <img
                            src={item.image}
                            alt={item.name}
                            width={600}
                            height={400}
                            className="rounded-t-lg object-cover w-full aspect-[3/2]"
                        />
                        <CardContent className="grid gap-4 pt-5">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <div className="text-primary font-semibold">${item.price}</div>
                            </div>
                            <p className="text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
