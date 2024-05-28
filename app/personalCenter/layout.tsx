import { usePathname } from "next/navigation";

export default function TokenZoneLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <div className="relative flex h-[calc(100vh-5rem)] z-9">

            <div className="md:px-12 md:py-8 bg-[#F1F1F1] w-full">
                <div className="bg-white rounded-lg h-full overflow-hidden shadow-[0_0px_20px_#00000010]">
                    {children}
                </div>
            </div>
        </div>
    );
}

