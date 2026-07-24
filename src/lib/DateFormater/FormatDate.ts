export class FormatDate {


    // 18 Jul 2026
    static shortDate(date: Date | string ) {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    }

    // 18 July 2026
    static longDate(date: Date ) {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    // 18/07/2026
    static numericDate(date: Date | string) {
        return new Date(date).toLocaleDateString("en-IN");
    }

    /* -------------------- Time -------------------- */

    // 09:30 AM
    static time(date: Date | string) {
        return new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    // 09:30:20 AM
    static timeWithSeconds(date: Date | string) {
        return new Date(date).toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    }

    /* ---------------- Date & Time ---------------- */

    // 18 Jul 2026, 09:30 AM
    static dateTime(date: Date | string) {
        return new Date(date).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    }

    /* -------------------- Relative -------------------- */

    // Today, Yesterday, 2 days ago...
    static relative(date: Date | string) {

        const target = new Date(date);

        const now = new Date();

        const diff = now.getTime() - target.getTime();

        const minutes = Math.floor(diff / 60000);

        const hours = Math.floor(minutes / 60);

        const days = Math.floor(hours / 24);

        if (minutes < 1) return "Just now";

        if (minutes < 60) return `${minutes} min ago`;

        if (hours < 24) return `${hours} hr ago`;

        if (days === 1) return "Yesterday";

        if (days < 7) return `${days} days ago`;

        return this.shortDate(target);
    }

    /* -------------------- ISO -------------------- */

    // 2026-07-18
    static isoDate(date: Date | string) {
        return new Date(date).toISOString().split("T")[0];
    }

    /* -------------------- Weekday -------------------- */

    // Monday
    static weekday(date: Date | string) {
        return new Date(date).toLocaleDateString("en-IN", {
            weekday: "long",
        });
    }

    // Mon
    static shortWeekday(date: Date | string) {
        return new Date(date).toLocaleDateString("en-IN", {
            weekday: "short",
        });
    }

    /* -------------------- Month -------------------- */

    // July
    static month(date: Date | string) {
        return new Date(date).toLocaleDateString("en-IN", {
            month: "long",
        });
    }

    // Jul
    static shortMonth(date: Date | string) {
        return new Date(date).toLocaleDateString("en-IN", {
            month: "short",
        });
    }

    /* -------------------- Year -------------------- */

    static year(date: Date | string) {
        return new Date(date).getFullYear();
    }

   /*---------------------Time in 12 hour --------------------*/

    static convertTo12HourFormat(time: string) {
        // time format: "21:00:00" or "21:00"
        const [hours, minutes] = time.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hour12 = hours % 12 || 12;
        return `${hour12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
}