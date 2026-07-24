export enum CodePrefix {
    PATIENT = "PAT",
    APPOINTMENT = "APT",
    INVOICE = "INV",
    PAYMENT = "PAY",
    VISIT = "VIS",
    PRESCRIPTION = "PRS",
    SERVICE = "SER",
}

interface GenerateCodeOptions {
    prefix: CodePrefix;

    number: number;

    length?: number;
}

export function generateCode({
    prefix,
    number,
    length = 6,
}: GenerateCodeOptions): string {

    return `${prefix}-${String(number).padStart(length, "0")}`;

}