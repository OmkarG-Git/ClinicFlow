import { PaginationMeta } from "@/types/pagination";
import { Button } from "@/components/ui/button/Button";

interface Props {

    pagination: PaginationMeta;

    onPageChange?: (page:number)=>void;

}

export function DataTablePagination({

    pagination,

    onPageChange,

}:Props){

    const currentPage = pagination.page ?? 1;
    const totalPages = pagination.totalPages ?? 1;

    return (
        <div className="flex items-center justify-between p-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
            </p>

            <div className="flex gap-2">
                <Button
                    disabled={!pagination.hasPrevious}
                    onClick={() => onPageChange?.(currentPage - 1)}
                >
                    Previous
                </Button>

                <Button
                    disabled={!pagination.hasNext}
                    onClick={() => onPageChange?.(currentPage + 1)}
                >
                    Next
                </Button>
            </div>
        </div>
    );

}