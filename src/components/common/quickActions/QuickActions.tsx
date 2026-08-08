// QuickActions.tsx
import { QuickActionType } from "@/constants/quick-actions";
import { Button } from "@base-ui/react"
import { LucideIcon } from "lucide-react"
import { useAction } from "@/components/actions/useAction";

// Export the interface
export interface QuickAction {
    icon: LucideIcon;
    label: string;
    handler?: () => void;
}   

export interface QuickActionProps {
    className?: string;
    actions: QuickActionType[];
}

// Export the component
export function QuickActions({
    className = "",
    actions
}: QuickActionProps) {

    const { openAction } = useAction();

    if (!actions || actions.length === 0) {
        return null;
    }

    return(
        <div className={`${className ? className : ""}`}>
            {actions.map((action, index) => (
                <Button
                    key={index}
                    onClick={() => openAction(
                        action.action,
                        action.payload,
                    )}
                    className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[12.5px] font-medium text-white/80 backdrop-blur transition hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                    <span className="grid h-6 w-6 place-items-center rounded-full text-emerald-400 transition group-hover:bg-cyan-400 group-hover:scale-110 group-hover:text-black">
                        <action.icon className="h-3.5 w-3.5" />
                    </span>
                    {action.label}
                </Button>
            ))}
        </div>
    )
}