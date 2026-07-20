import { UsersRound } from "lucide-react";


interface HeaderProps {
    title: string;
    description: string;
    action: () => void
}

export function Header({
    title,
    description,
    action
}: HeaderProps) {

    return (
        <div className="">

            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                    <div>
                        <UsersRound size={20} />
                    </div>
                    <span>Staff</span>
                </div>
            </div>
        </div>
    )
}