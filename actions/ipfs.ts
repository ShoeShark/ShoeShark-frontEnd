"use server"

type InputData = {
    description: string
    location: string
    title: string
    content: string

}
export async function uploadToIpfs({
    title,
    description,
    location,
    content
}: InputData) {
    try {
        const jsonBody = {
            description,
            location,
            title,
            content
        };

        const pinataMetadata = JSON.stringify({
            name: "jsonUpload",
            keyvalues: {
                exampleKey: "exampleValue"
            }
        });

        const pinataOptions = JSON.stringify({
            cidVersion: 0,
        });

        const formData = new FormData();
        const blob = new Blob([JSON.stringify(jsonBody)], { type: 'application/json' });

        formData.append("file", blob, "file.json");
        formData.append("pinataMetadata", pinataMetadata);
        formData.append("pinataOptions", pinataOptions);

        const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.PINATA_JWT}`, // Store your JWT in .env.local
            },
            body: formData,
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }

}
