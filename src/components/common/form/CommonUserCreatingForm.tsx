import { ModalPortal } from "@/components/ModalPortal";
import { Button } from "@/components/ui/button/Button";
import { Input } from "@/components/ui/input/Input";
import { Label } from "@/components/ui/label/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNotificationStore } from "@/store/notification-store";
import { User2, Mail, UserPlus2, Loader, X } from "lucide-react";
import { 
    userValidationSchema,
    type UserValidationSchemaType
 } from "@/lib/validations/owner/addUser.validation";
import { AddUserInClinic } from "@/actions/owner/addUser";

type FormProps = {
    open: boolean,
    onClose: () => void,
    title: string,
    description: string,
    role: string,
    ClinicId: string | null,
}

export function RecepstionistAndDoctoreCreatingForm({
    open,
    onClose,
    title,
    description,
    role,
    ClinicId
}: FormProps) {

    
    const notification = useNotificationStore();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm<UserValidationSchemaType>({
        resolver: zodResolver(userValidationSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: undefined,
            clinicId: "",
        }   
    });

    console.log("my error", errors);

    if(!open) return

    const firstNameWatch = watch("firstName")
    const lastNameWatch = watch("lastName")
    const emailWatch = watch("email")
    const passwordWatch = watch("password")

    async function onSubmit(values: UserValidationSchemaType) {
        const res = await AddUserInClinic({
            ...values,
            clinicId: ClinicId,
        });

        if (!res?.success) {
            if(res?.message) {
                notification.error(res?.message);
            }
            return;
        }

        notification.success(res.message);
        console.log("returning data", res.data);
}

    return  (
        <ModalPortal>
            <div 
                onClick={onClose}
                className={`fixed inset-0 flex items-center justify-center z-30 bg-black/70 p-5`}
            >
                <div 
                    className="flex flex-col bg-card p-5 rounded-2xl text-muted-forground "
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex gap-4 justify-between">
                        <div className="flex gap-4">
                            <div className="p-3 rounded-xl">
                                <UserPlus2 className="h-6 w-6 text-blue-600" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold ">{title}</h2>
                                <p className="text-sm text-slate-500 mt-0.5">
                                    {description}
                                </p>
                            </div>
                        </div>
                        <div>
                            <Button 
                                className={"bg-muted"}
                                onClick={() => onClose()}
                            >
                                <X />
                            </Button>
                        </div>
                    </div>

                   <form 
                    className="flex flex-col mt-5"
                    onSubmit={handleSubmit(onSubmit)}
                   >
                        <div className="grid grid-cols-2 mt-2 gap-6">
                            <div>
                                <Label
                                    className=""
                                >
                                    Enter { role === "DOCTOR" ? "Doctor" : "Receptionist" } first name
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"  />
                                    <Input
                                        type="text"
                                        placeholder="Ramesh" 
                                        className={` pl-9 
                                                ${firstNameWatch && !errors.firstName ? "border border-green-400" : "bg-input"}
                                            `}
                                        {...register("firstName")}
                                    />                                        
                                </div>
                                {errors.firstName && (
                                    <p className=" text-xs text-red-500 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.firstName.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <Label
                                    className=""
                                >
                                    Enter { role === "DOCTOR" ? "doctor" : "receptionist" } last name
                                    <span className="text-red-500">*</span>
                                </Label>

                                <div className="relative mt-2">
                                    <User2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"  />
                                    <Input
                                        type="text"
                                        placeholder="Kumar" 
                                        className={` pl-9 
                                                ${lastNameWatch && !errors.lastName ? "border border-green-400" : "bg-input"}
                                            `}
                                        {...register("lastName")}
                                    />                                        
                                </div>
                                {errors.lastName && (
                                    <p className=" text-xs text-red-500 flex items-center gap-1">
                                        <span className="w-1 h-1 rounded-full bg-red-500" />
                                        {errors.lastName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-col  mt-2">
                            <div className="mt-2">
                                <Label
                                    className=""
                                >
                                    Enter { role === "DOCTOR" ? "Doctor" : "Receptionist" } email
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input 
                                        type="email"
                                        className={`pl-9 
                                                ${emailWatch && !errors.email ? "border border-green-400" : "bg-input"}
                                            `}
                                        placeholder="ramesh@gmail.com"
                                        {...register("email")}
                                    />
                                </div>
                            </div>
                            {errors.email && (
                                <p className=" text-xs text-red-500 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-red-500" />
                                    {errors.email.message}
                                </p>
                            )}

                            <div className="mt-2">
                                <Label
                                    className=""
                                >
                                    Create { role === "DOCTOR" ? "doctor" : "receptionist" } password
                                    <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative mt-2">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                    <Input 
                                        type="password"
                                        className={` pl-9 
                                                ${passwordWatch && !errors.password ? "border border-green-400" : "bg-input"}
                                            `}
                                        placeholder="*******"
                                        {...register("password")}
                                    />
                                </div>
                            </div>
                            {errors.password && (
                                <p className=" text-xs text-red-500 flex items-center gap-1">
                                    <span className="w-1 h-1 rounded-full bg-red-500" />
                                    {errors.password.message}
                                </p>
                            )}

                            <div className="mt-4">
                                <Label
                                    className="text-neutral-700"
                                >
                                    Role
                                </Label>
                                <div className="relative mt-2">
                                    <Input 
                                        disabled
                                        className={` pl-9 bg-input `}
                                        defaultValue={role}
                                        {...register("role")}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end mt-2">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center gap-2">
                                        <Loader className="animat animate-spin" />
                                        Creating...
                                    </div>
                                ) : (
                                    <>
                                        <UserPlus2 className="h-4 w-4" />
                                        Add { role === "DOCTOR" ? "Doctor" : "Receptionist" }
                                    </>
                                )}
                            </Button>
                        </div>
                   </form>
                </div>
            </div>
        </ModalPortal>
    )
}