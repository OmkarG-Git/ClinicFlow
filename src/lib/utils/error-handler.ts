export function getErrorMessage(error: unknown): string {
    if (error instanceof Error) {
        return error.message;
    }
    
    if (typeof error === "string") {
        return error;
    }
    
    if (typeof error === "object" && error !== null) {
        // Check for common error shapes
        const err = error as any;
        
        if (typeof err.message === "string") {
            return err.message;
        }
        
        if (typeof err.error === "string") {
            return err.error;
        }
        
        if (typeof err.data?.message === "string") {
            return err.data.message;
        }
        
        try {
            return JSON.stringify(error);
        } catch {
            return String(error);
        }
    }
    
    return "An unexpected error occurred";
}

export function isRedirectError(error: unknown): boolean {
    return error instanceof Error && error.message === 'NEXT_REDIRECT';
}

export function isNetworkError(error: unknown): boolean {
    return error instanceof TypeError && error.message.includes('fetch');
}