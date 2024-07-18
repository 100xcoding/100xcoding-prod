"use client";

import { convertFileToUrl, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
  accept: { [key: string]: string[] };
  maxSize: number;
};
export const FileUploader = ({
  files,
  onChange,
  accept,
  maxSize,
}: FileUploaderProps) => {
  const [rejected, setRejected] = useState([]);
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [onChange],
  );

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept,
    maxSize,
    onDrop,
  });
  // console.log(fileRejections);
  // if (fileRejections.length > 0) {
  //     toast.error(fileRejections[0].errors[0].message);
  // }
  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.forEach((rejection) => {
        rejection.errors.forEach((error) => {
          toast.error(error.message);
        });
      });
    }
  }, [fileRejections]);
  return (
    <div {...getRootProps()} className="file-upload">
      <input {...getInputProps()} />
      {files && files[0]?.type.includes("image") && files?.length > 0 ? (
        <Image
          src={convertFileToUrl(files[0])}
          width={1000}
          height={1000}
          alt="uploaded image"
          className="max-h-[200px] maxw-[200px] overflow-hidden object-cover"
        />
      ) : (
        <>
          {/* <Image
                        src="/assets/icons/upload.svg"
                        width={40}
                        height={40}
                        alt="upload"
                    /> */}
          <div className="text-center py-4 w-full">
            <p className="text-14-regular ">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            <p className="text-12-regular">
              SVG, PNG, JPG or GIF (max. 800x400px)
            </p>
          </div>
        </>
      )}
    </div>
  );
};
