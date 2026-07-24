import Image from "next/image"

export function UnauthorizedPage(){

    return(
        <div className="h-screen flex items-center justify-center">
            <Image
                src="/UnauthorizedImage.png"
                alt="ClinicFlow"
                width={400}
                height={400}
                priority
                className="relative z-10 rounded-xl "
            />
        </div>
    )
}