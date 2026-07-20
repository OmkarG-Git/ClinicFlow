import { NextResponse } from "next/server"
import cloudinary from "@/lib/cloudinary/cloudinary"

export async function POST( request: Request) {
    try {
        const formData = await request.formData();

        const file = formData.get("file") as File;

        if(!file) {
            NextResponse.json(
                { message: "No file uploaded" },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();

        const buffer = Buffer.from(bytes);

        const uploaded = await new Promise<any>((resolve, reject) => {
            cloudinary.uploader
                .upload_stream(
                    {
                        folder: "clinicflow/clinics/logo",
                        resource_type: "image",
                        transformation: [
                           {
                             width: 400,
                             height: 400,
                             crop: "limit",
                             quality: "auto",
                             fetch_format: "auto",
                           },
                        ],
                    },
                    (error, result) => {
                        if(error) return reject(error)

                        resolve(result)
                    },
                )
                .end(buffer);
        });

        return NextResponse.json({
            url: uploaded?.secure_url,
        })


    } catch(error) {
        console.log(error);

        return NextResponse.json(
            {
                message: "Upload failed",
            },
            {
                status: 500,
            }
        );
    }
}