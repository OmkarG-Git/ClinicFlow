interface Props{

    children:React.ReactNode;

}

export function DataTableActions({

    children,

}:Props){

    return(

        <div className="flex items-center justify-end">

            {children}

        </div>

    )

}