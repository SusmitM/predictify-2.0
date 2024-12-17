
import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand, PutObjectCommandInput } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
    },
  });


export const POST=async(req:NextRequest)=>{
    const session = await getServerSession(authOptions);
 
  const user = session?.user as User;
  if (!session || !session.user) {
    return Response.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  const userId = user.id;
    const formData=await req.formData();

    const file:any = formData.get("file");
    if (!file) {
      return NextResponse.json({ success:false,message: "No files received." }, { status: 400 });
    }
  
    const buffer = Buffer.from(await file?.arrayBuffer());
    const filename =  file.name.replaceAll(" ", "_");
    const uniqueFilename=`${uuidv4()}-${filename}`
   
    try {
        const fileKey = `${userId}/${uniqueFilename}`;
        const uploadParams: PutObjectCommandInput = {
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: fileKey,
            Body: buffer,
            ContentType: file.mimetype || "application/octet-stream",
          };
      
          // Upload file to S3
          const s3Response = await s3.send(new PutObjectCommand(uploadParams));
      
          // Construct the file URL
          const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${uploadParams.Key}`;
      
          return NextResponse.json({ 
            success: true,
            message: "File uploaded successfully",
            data: {
              filename: file.name,
              uniqueFilename:uniqueFilename
            },
          });
      } catch (error) {
        console.error("Error occured ", error);
        return NextResponse.json({ success:false,message: "File upload failed", status: 500 });
      }
}