"use client"

import { ChangeEvent, useRef } from "react";
import { generateNextFrame } from "../api/dalle";

function UploadButton() {
    const fileUploadRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <input 
                type="file" 
                accept=".png,.jpg" 
                ref={fileUploadRef} 
                style={{display: "none"}}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const reader = new FileReader();
                    reader.onload = (ev: ProgressEvent<FileReader>) => {
                        const img = ev.target?.result;
                        if (img) {
                            // Finally can do something with the image URL
                            console.log(img);
                            generateNextFrame(img as string);
                        }
                        else {
                            console.error("Error uploading image");
                        }
                    }
                    const files = fileUploadRef.current?.files;
                    if (files && files.length > 0) {
                        reader.readAsDataURL(files[0]);
                    }
                }}
            />
            <button className="bg-slate-200 hover:bg-slate-400 transition active:bg-slate-300 p-2 text-slate-800 font-bold rounded" onClick={() => {
                    fileUploadRef.current?.click()
                }
            }> 
                Upload Image 
            </button>
        </>
    )
    }

export { UploadButton };