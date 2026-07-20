import { ToastProvider } from "@/providers/ToastProvider";
import AuthProvider from "@/providers/AuthProvider";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>
        <AuthProvider>
            <ToastProvider>
              <TooltipProvider delay={150}>
                {children}
              </TooltipProvider>
            </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}