"use client";

import { convertFileToUrl, getImageUrl } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
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
      {files && files?.length > 0 ? (
        files[0]?.type.includes("image") ? (
          <Image
            src={convertFileToUrl(files[0])}
            width={1000}
            height={1000}
            alt="uploaded image"
            className="max-h-[200px] max-w-[200px] overflow-hidden object-cover"
          />
        ) : (
          <div className="bg-dark-400 w-full flex items-center justify-center py-5 rounded-lg">
            <Link
              target="_blank"
              href={convertFileToUrl(files[0])}
              className="underline text-green-500"
            >
              {files[0].name}
            </Link>
          </div>
        )
      ) : (
        <>
          {/* <Image
                        src="/assets/icons/upload.svg"
                        width={40}
                        height={40}
                        alt="upload"
                    /> */}
          <div className="text-center py-4 w-full">
            <p className="text-sm">
              <span className="text-green-500">Click to upload </span>
              or drag and drop
            </p>
            {/* <p className="text-xs">
              SVG, PNG, JPG or GIF
            </p> */}
          </div>
        </>
      )}
    </div>
  );
};
