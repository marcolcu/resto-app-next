"use client";

import { useEffect, useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { Hero } from "./component/Hero";
import { Signature } from "./component/Signature";
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
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { toast, useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { Customers } from "./component/Customers";

export function MicrositeTabsDemo() {
  const { state, dispatch } = useAppContext(); // Get token from context

  // State for Hero section
  const [drawerOpenHero, setDrawerOpenHero] = useState(false);
  const [fetch, setFetch] = useState(false);
  const [editMicrositeIdHero, setEditMicrositeIdHero] = useState<number | null>(
    null
  );
  const [dataHero, setDataHero] = useState({
    content: "",
    image: "",
    tipe_section: "header",
    description: "",
  });

  const { toast } = useToast();

  // State for Signature section
  const [drawerOpenSignature, setDrawerOpenSignature] = useState(false);
  const [showButton, setShowButton] = useState<JSX.Element | string>("");
  const [heroHasData, setHeroHasData] = useState(false);
  const [editMicrositeIdSignature, setEditMicrositeIdSignature] = useState<
    number | null
  >(null);
  const [dataSignature, setDataSignature] = useState({
    content: "",
    description: "",
    image: "",
    tipe_section: "signature",
    points: [
      { title: "", description: "" },
      { title: "", description: "" },
      { title: "", description: "" },
    ],
  });

  const { postMicrosite, micrositeError } = useCreateMicrosite();
  const { postUpdateMicrosite } = useUpdateMicrosite();
  const { postDeleteMicrosite } = useDeleteMicrosite();

  useEffect(() => {
    if (micrositeError) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: micrositeError?.message,
      });
    }
  }, [micrositeError]);

  const handleHeroDataChange = (hasData: boolean) => {
    setHeroHasData(hasData);
  };

  const handleDataChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string,
    index?: number
  ) => {
    const { name, value } = e.target;

    if (type === "signature") {
      if (index !== undefined) {
        // Handle changes to points array
        setDataSignature((prevState) => {
          const updatedPoints = [...prevState.points];
          updatedPoints[index] = {
            ...updatedPoints[index],
            [name]: value,
          };
          return { ...prevState, points: updatedPoints };
        });
      } else {
        // Handle other fields
        setDataSignature((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    } else if (type === "hero") {
      // Handle Hero data change
      setDataHero((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  // Common function to handle data submission
  const handleSubmitMicrosites = async (type: string) => {
    try {
      let body;

      // Buat body request berdasarkan tipe microsite
      if (type === "hero") {
        body = {
          content: dataHero.content,
          image: dataHero.image,
          tipe_section: dataHero.tipe_section,
          description: dataHero.description,
        };
      } else if (type === "signature") {
        body = {
          content: dataSignature.content,
          description: dataSignature.description,
          tipe_section: dataSignature.tipe_section,
          points: dataSignature.points,
        };
      } else {
        throw new Error("Unknown type");
      }

      // Cek apakah ID untuk edit ada, jika ada maka update, jika tidak maka create baru
      if (
        (type === "hero" && editMicrositeIdHero !== null) ||
        (type === "signature" && editMicrositeIdSignature !== null)
      ) {
        const editId =
          type === "hero" ? editMicrositeIdHero : editMicrositeIdSignature;

        // Update existing microsite
        await postUpdateMicrosite({
          header: { Authorization: "Bearer " + state?.token },
          body,
          queryParams: { id: editId },
        });
      } else {
        // Create new microsite
        await postMicrosite({
          header: { Authorization: "Bearer " + state?.token },
          body,
        });
      }

      // Trigger fetch data setelah submit
      setFetch((prev) => !prev);
    } catch (error) {
      console.error("Error submitting microsite:", error);
    } finally {
      // Tutup drawer dan refresh state berdasarkan tipe
      if (type === "hero") {
        dispatch({ fetchHeader: true });
        setDrawerOpenHero(false);
      } else if (type === "signature") {
        dispatch({ fetchSignature: true });
        setDrawerOpenSignature(false);
      }
    }
  };

  const handleDeleteMicrosite = async (id: number, type: string) => {
    try {
      await postDeleteMicrosite({
        header: {
          Authorization: `Bearer ${state?.token}`,
        },
        queryParams: {
          id,
        },
      });

      // Trigger data refresh based on type
      setFetch((prev) => !prev);
      if (type === "signature") {
        dispatch({ fetchSignature: true });
      } else if (type === "hero") {
        dispatch({ fetchHeader: true });
      }
    } catch (error) {
      console.error("Error deleting microsite:", error);
    }
  };

  const openHeroDrawer = () => {
    setDrawerOpenHero(true);
    setEditMicrositeIdHero(null); // Reset edit state
    setDataHero({
      content: "",
      image: "",
      tipe_section: "header",
      description: "",
    });
  };

  const openSignatureDrawer = () => {
    setDrawerOpenSignature(true);
    setEditMicrositeIdSignature(null); // Reset edit state
    setDataSignature({
      content: "",
      description: "",
      tipe_section: "signature",
      image: "",
      points: [
        { title: "", description: "" },
        { title: "", description: "" },
        { title: "", description: "" },
      ],
    });
  };

  const handleEditMicrosite = (
    id: number,
    micrositeData: any,
    type: "hero" | "signature" | "customers"
  ) => {
    if (type === "hero") {
      setDataHero({
        content: micrositeData.content,
        image: micrositeData.image ?? "",
        tipe_section: micrositeData.tipe_section,
        description: micrositeData.description,
      });
      setEditMicrositeIdHero(id);
      setDrawerOpenHero(true);
    } else if (type === "signature") {
      setDataSignature({
        content: micrositeData.content,
        description: micrositeData.description,
        tipe_section: micrositeData.tipe_section,
        image: micrositeData.image,
        points: micrositeData.points || [
          { title: "", description: "" },
          { title: "", description: "" },
          { title: "", description: "" },
        ],
      });
      setEditMicrositeIdSignature(id);
      setDrawerOpenSignature(true);
    }
  };

  const tabs = [
    {
      title: "Hero Section",
      value: "hero",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <div className="flex justify-between items-center">
            <p>Hero Section</p>
            <Button onClick={openHeroDrawer}>Add Hero Section</Button>
          </div>
          <Hero
            openDrawer={openHeroDrawer}
            fetchTrigger={fetch}
            hasData={heroHasData}
            onEditMicrosite={(id, micrositeData) =>
              handleEditMicrosite(id, micrositeData, "hero")
            }
            onDeleteMicrosite={(id) => handleDeleteMicrosite(id, "hero")}
          />
        </div>
      ),
    },
    {
      title: "Signature Section",
      value: "signature",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <div className="flex justify-between items-center">
            <p>Signature Section</p>
            <Button onClick={openSignatureDrawer}>Add Signature Section</Button>
          </div>
          <Signature
            openDrawer={openSignatureDrawer}
            fetchTrigger={fetch} // Pass the fetchTrigger to Signature
            onEditMicrosite={(id, micrositeData) =>
              handleEditMicrosite(id, micrositeData, "signature")
            }
            onDeleteMicrosite={(id) => handleDeleteMicrosite(id, "signature")}
          />
        </div>
      ),
    },
    {
      title: "Customers Say Section",
      value: "customers",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <div className="flex justify-between items-center">
            <p>Customers Say Section</p>
            <Button onClick={openSignatureDrawer}>Add Customers Say Section</Button>
          </div>
          <Customers
            openDrawer={openSignatureDrawer}
            fetchTrigger={fetch} // Pass the fetchTrigger to Signature
            onEditMicrosite={(id, micrositeData) =>
              handleEditMicrosite(id, micrositeData, "customers")
            }
            onDeleteMicrosite={(id) => handleDeleteMicrosite(id, "customers")}
          />
        </div>
      ),
    },
    {
      title: "About Us Section",
      value: "about",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-black border border-2 bg-white">
          <p>About Us Section</p>
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

      {/* Hero Drawer */}
      <Drawer open={drawerOpenHero} onOpenChange={setDrawerOpenHero}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>
                {editMicrositeIdHero ? "Edit Hero Section" : "Add Hero Section"}
              </DrawerTitle>
              <DrawerDescription>
                {editMicrositeIdHero
                  ? "Edit the hero section details."
                  : "Insert your hero section in here."}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0">
              <div className="flex flex-col gap-3 items-center justify-center">
                <Input
                  type="text"
                  name="content"
                  id="content"
                  placeholder="Content"
                  value={dataHero.content}
                  onChange={(e) => handleDataChange(e, "hero")}
                />
                <Input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Image Link (Optional)"
                  value={dataHero.image}
                  onChange={(e) => handleDataChange(e, "hero")}
                />
                <Input
                  type="text"
                  placeholder="Type your description here."
                  name="tipe_section"
                  id="tipe_section"
                  value={dataHero.tipe_section}
                  onChange={(e) => handleDataChange(e, "hero")}
                  disabled
                />
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Enter detailed description here."
                  value={dataHero.description}
                  onChange={(e) => handleDataChange(e, "hero")}
                />
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => handleSubmitMicrosites("hero")}>
                {editMicrositeIdHero ? "Save Changes" : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setDrawerOpenHero(false)}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Signature Drawer */}
      <Drawer open={drawerOpenSignature} onOpenChange={setDrawerOpenSignature}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-lg">
            <DrawerHeader>
              <DrawerTitle>
                {editMicrositeIdSignature
                  ? "Edit Signature Section"
                  : "Add Signature Section"}
              </DrawerTitle>
              <DrawerDescription>
                {editMicrositeIdSignature
                  ? "Edit the signature section details."
                  : "Insert your signature section in here."}
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 flex flex-col md:flex-row gap-4">
              <div className="flex-1 flex flex-col gap-3">
                <p className="text-sm text-muted-foreground invisible">Point</p>
                <Input
                  type="text"
                  name="content"
                  id="contnet"
                  placeholder="Content"
                  value={dataSignature.content}
                  onChange={(e) => handleDataChange(e, "signature")}
                />
                <Input
                  type="text"
                  name="image"
                  id="image"
                  placeholder="Image Link (Optional)"
                  value={dataSignature.image}
                  onChange={(e) => handleDataChange(e, "signature")}
                />
                <Textarea
                  name="description"
                  id="description"
                  placeholder="Enter detailed description here."
                  value={dataSignature.description}
                  onChange={(e) => handleDataChange(e, "signature")}
                  rows={14}
                />
                <Input
                  type="text"
                  placeholder="Type your section type here."
                  name="tipe_section"
                  id="tipe_section"
                  value={dataSignature.tipe_section}
                  onChange={(e) => handleDataChange(e, "signature")}
                  disabled
                />
              </div>
              <div className="flex-1 flex flex-col gap-3">
                {dataSignature.points.map((point, index) => (
                  <div key={index} className="mb-4 flex flex-col gap-3">
                    <p className="text-sm text-muted-foreground">
                      Point {index + 1}
                    </p>
                    <Input
                      type="text"
                      name="title"
                      id={`title_${index}`}
                      placeholder="Additional Field"
                      value={point.title}
                      onChange={(e) => handleDataChange(e, "signature", index)}
                    />
                    <Textarea
                      name="description"
                      id={`description_${index}`}
                      placeholder="Additional description here."
                      value={point.description}
                      onChange={(e) => handleDataChange(e, "signature", index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <DrawerFooter>
              <Button onClick={() => handleSubmitMicrosites("signature")}>
                {editMicrositeIdSignature ? "Save Changes" : "Submit"}
              </Button>
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  onClick={() => setDrawerOpenSignature(false)}
                >
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

function DummyContent() {
  return <div>Placeholder content here</div>;
}
