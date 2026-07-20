export async function uploadFile(
  file: File,
  type: "clinicLogo" | "doctorAvatar" | "patientAvatar"
) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("type", type);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response.json() as Promise<{
    url: string;
  }>;
}