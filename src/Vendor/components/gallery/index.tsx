"use client";

import { Tab } from "@headlessui/react";
import Image from "next/image";
import { Image as Imgtype } from "@/type";
import GalleryTab from "./gallerytab";

interface GallerryProp {
  images: Imgtype[];
}
const Gallery: React.FC<GallerryProp> = ({ images }) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6">
          {images.map((image) => (
            <GalleryTab key={image.id} image={image}></GalleryTab>
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className="aspect-square w-full">
        {images.map((image) => (
          <Tab.Panel className="aspect-square relative h-full w-full overflow-hidden">
            <Image
              src={image.url}
              fill
              alt="img"
              className="object-cover object-center"
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
