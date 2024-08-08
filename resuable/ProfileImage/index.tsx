import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { RootState } from "@/components/store";
import Image from "next/image";
import { BASE_URL } from "@/utils/general";

interface Props {
  height: string | number;
  width: string | number;
}

export default function ProfileImage({ height, width }: Props) {
  const imageUrl = useSelector<RootState, string | any>(
    (state: any) => state.image.imageUrl
  );
  console.log(imageUrl, "hello");
  console.log(BASE_URL + imageUrl, "hass");
  

  return (
    <Image
      src={BASE_URL + imageUrl}
      alt="..."
      style={{
        borderRadius: "50%",
        objectFit: "cover",
        width: width, // Directly use the width and height values
        height: height
      }}
      width={100}
      height={100}
    />
  );
}
