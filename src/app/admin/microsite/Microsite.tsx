"use client";

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {
    Drawer, DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle
} from "@/components/ui/drawer";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {DataTableMicrosite} from "@/components/component/datatable-microsite";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";

export const Microsite = () => {
    const [microsites, setMicrosites] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editMicrositeId, setEditMicrositeId] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteMicrositeId, setDeleteMicrositeId] = useState(null);

    const handleEditMicrosite = () => {
        // const micrositeToEdit = microsites.find((microsite) => microsite.id === id);
        // if (micrositeToEdit) {
        //     setName(micrositeToEdit.name);
        //     setDescription(micrositeToEdit.description);
        //     setEditMicrositeId(id);
        //     setDrawerOpen(true); // Open the drawer
        // }
    };

    const handleSubmitMicrosites = async () => {
        // try {
        //     if (editMicrositeId) {
        //         // Handle update logic here
        //         await axios.put(`/api/microsites/${editMicrositeId}`, {
        //             name,
        //             description,
        //         });
        //     } else {
        //         // Handle create logic here
        //         await axios.post("/api/microsites", { name, description });
        //     }
        //
        //     // Reset form
        //     setName("");
        //     setDescription("");
        //     setEditMicrositeId(null);
        //
        //     // Refresh microsites
        //     const updatedMicrositesResponse = await axios.get("/api/microsites");
        //     setMicrosites(updatedMicrositesResponse.data);
        //
        //     setDrawerOpen(false); // Close the drawer
        // } catch (error) {
        //     console.error("Error saving microsite:", error);
        // }
    };

    const handleDeleteMicrosite = async () => {
        // try {
        //     await axios.delete(`/api/microsites/${deleteMicrositeId}`);
        //     setMicrosites((prevMicrosites) =>
        //         prevMicrosites.filter((microsite) => microsite.id !== deleteMicrositeId)
        //     );
        //     setDeleteDialogOpen(false);
        // } catch (error) {
        //     console.error("Error deleting microsite:", error);
        // }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="scroll-m-20 text-xl font-bold tracking-tight lg:text-3xl">
                    Microsites
                </h1>
                <Button
                    onClick={() => {
                        setDrawerOpen(true);
                        setEditMicrositeId(null);
                        setName("");
                        setDescription("");
                    }}
                    variant="default"
                >
                    + Add Microsites
                </Button>
            </div>
            <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
                <DrawerContent>
                    <div className="mx-auto w-full max-w-sm">
                        <DrawerHeader>
                            <DrawerTitle>
                                {editMicrositeId ? "Edit Microsite" : "Add Microsite"}
                            </DrawerTitle>
                            <DrawerDescription>
                                {editMicrositeId
                                    ? "Edit the microsite details."
                                    : "Insert your microsites in here."}
                            </DrawerDescription>
                        </DrawerHeader>
                        <div className="p-4 pb-0">
                            <div className="flex flex-col gap-3 items-center justify-center">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <Textarea
                                    placeholder="Type your description here."
                                    name="description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <DrawerFooter>
                            <Button onClick={handleSubmitMicrosites}>
                                {editMicrositeId ? "Save Changes" : "Submit"}
                            </Button>
                            <DrawerClose asChild>
                                <Button
                                    variant="outline"
                                    onClick={() => setDrawerOpen(false)}
                                >
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
            <DataTableMicrosite
                data={microsites}
                onEdit={handleEditMicrosite}
                onDelete={(id) => {
                    // setDeleteMicrositeId(id);
                    // setDeleteDialogOpen(true);
                }}
            />
            <AlertDialog
                open={deleteDialogOpen}
                onOpenChange={setDeleteDialogOpen}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this microsite.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteMicrosite}>
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
};