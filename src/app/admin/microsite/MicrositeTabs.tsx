"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Hero } from "./component/Hero";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/app/provider";
import {
  useCreateMicrosite,
  useUpdateMicrosite,
  useDeleteMicrosite,
} from "@/services/useMicrositeService";
import Image from "next/image";

export function MicrositeTabsDemo() {
  const { state, dispatch } = useAppContext(); // Get token from context
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [editMicrositeId, setEditMicrositeId] = useState<number | null>(null);
  const [data, setData] = useState({
    content: "",
    image: "",
    tipe_section: "",
  });

  const { postMicrosite } = useCreateMicrosite();
  const { postUpdateMicrosite } = useUpdateMicrosite();
  const { postDeleteMicrosite } = useDeleteMicrosite();

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const handleDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleEditMicrosite = (id: number, micrositeData: any) => {
    setData({
      content: micrositeData.content,
      image: micrositeData.image ?? "",
      tipe_section: micrositeData.tipe_section,
    });
    setEditMicrositeId(id);
    setDrawerOpen(true);
  };

  const handleSubmitMicrosites = async () => {
    try {
      if (editMicrositeId === null) {
        // Create new microsite
        await postMicrosite({
          header: {
            Authorization: "Bearer " + state?.token,
          },
          body: {
            content: data.content,
            image: data.image,
            tipe_section: data.tipe_section,
          },
        });
      } else {
        // Update existing microsite
        await postUpdateMicrosite({
          header: {
            Authorization: "Bearer " + state?.token,
          },
          body: {
            content: data.content,
            image: data.image,
            tipe_section: data.tipe_section,
          },
          queryParams: {
            id: editMicrositeId,
          },
        });
      }
      // Trigger data refresh in Hero component
      setFetch((prev) => !prev);
      dispatch({ fetchHeader: true });
    } catch (error) {
      console.error("Error submitting microsite:", error);
    } finally {
      setDrawerOpen(false); // Close drawer regardless of success or error
    }
  };

  const handleDeleteMicrosite = async (id: number) => {
    try {
      await postDeleteMicrosite({
        header: {
          Authorization: "Bearer " + state?.token,
        },
        queryParams: {
          id,
        },
      });
      // Trigger data refresh in Hero component
      setFetch((prev) => !prev);
      dispatch({ fetchHeader: true });
    } catch (error) {
      console.error("Error deleting microsite:", error);
    }
  };

  const tabs = [
    {
      title: "Hero Section",
      value: "product",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <div className="flex justify-between items-center">
            <p>Hero Section</p>
            <Button
              onClick={() => {
                setDrawerOpen(true);
                setEditMicrositeId(null); // Reset edit state
                setData({ content: "", image: "", tipe_section: "" });
              }}
            >
              Add Hero Section
            </Button>
          </div>
          <Hero
            openDrawer={openDrawer}
            fetchTrigger={fetch} // Pass the fetchTrigger to Hero
            onEditMicrosite={handleEditMicrosite}
            onDeleteMicrosite={handleDeleteMicrosite}
          />
        </div>
      ),
    },
    {
      title: "Signature Section",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <p>Signature Section</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Customers Say Section",
      value: "playground",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <p>Customers Say Section</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "About",
      value: "content",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <p>About</p>
          <DummyContent />
        </div>
      ),
    },
    {
      title: "Contact",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <p>Contact</p>
          <DummyContent />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex flex-col mx-auto w-full items-start justify-start">
        <Tabs tabs={tabs} />
      </div>

      {/* Drawer */}
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
                  name="content"
                  id="content"
                  placeholder="Content"
                  value={data.content}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Link Image"
                  value={data.image}
                  onChange={handleDataChange}
                />
                <Input
                  type="text"
                  placeholder="Type your description here."
                  name="tipe_section"
                  id="tipe_section"
                  value={data.tipe_section}
                  onChange={handleDataChange}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={handleSubmitMicrosites}>
                {editMicrositeId ? "Save Changes" : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button variant="outline" onClick={() => setDrawerOpen(false)}>
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%] md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
