import Link from "next/link"

export function LandingPage() {
    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                                        Savor the Flavors of Acme Restaurant
                                    </h1>
                                    <p className="max-w-[600px] text-muted-foreground md:text-xl">
                                        Experience a culinary journey through our expertly crafted menu, featuring
                                        locally-sourced
                                        ingredients and innovative dishes.
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                                    <Link
                                        href="/menu"
                                        className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

                                    >
                                        View Menu
                                    </Link>
                                    <Link
                                        href="/treservation"
                                        className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

                                    >
                                        Book a Table
                                    </Link>
                                </div>
                            </div>
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="550"
                                alt="Restaurant Interior"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-[3/1]"
                            />
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Explore Our Delectable
                                    Menu</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    From classic dishes to innovative creations, our menu features a wide variety of
                                    options to satisfy
                                    every palate.
                                </p>
                            </div>
                        </div>
                        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                            <img
                                src="/placeholder.svg"
                                width="550"
                                height="310"
                                alt="Menu Item"
                                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                            />
                            <div className="flex flex-col justify-center space-y-4">
                                <ul className="grid gap-6">
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Signature Dishes</h3>
                                            <p className="text-muted-foreground">
                                                Explore our chef's specialties, featuring locally sourced ingredients
                                                and unique flavor
                                                combinations.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Seasonal Specials</h3>
                                            <p className="text-muted-foreground">
                                                Indulge in our rotating selection of seasonal dishes, showcasing the
                                                freshest produce and
                                                ingredients.
                                            </p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="grid gap-1">
                                            <h3 className="text-xl font-bold">Dietary Options</h3>
                                            <p className="text-muted-foreground">
                                                Cater to various dietary needs with our selection of vegetarian, vegan,
                                                and gluten-free
                                                options.
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center justify-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers
                                    Say</h2>
                                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                                    Hear from our satisfied customers about their dining experiences at Acme Restaurant.
                                </p>
                            </div>
                            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="grid gap-1">
                                        <h3 className="text-xl font-bold">"The best meal I've had in years!"</h3>
                                        <p className="text-muted-foreground">- John Doe, Satisfied Customer</p>
                                        <p className="text-muted-foreground">
                                            "The flavors were incredible, and the service was\n impeccable. I can't wait
                                            to come back!"
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-center space-y-4">
                                    <div className="grid gap-1">
                                        <h3 className="text-xl font-bold">"A truly exceptional dining experience!"</h3>
                                        <p className="text-muted-foreground">- Jane Smith, Foodie Enthusiast</p>
                                        <p className="text-muted-foreground">
                                            "The ambiance, the food, the staff - everything was\n perfect. I can't wait
                                            to come back with my
                                            friends!"
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

function StarIcon(props: any) {
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
            <polygon
                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
    )
}
