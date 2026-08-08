import { ToastProvider } from "@/providers/ToastProvider";
import AuthProvider from "@/providers/AuthProvider";
import { TooltipProvider } from "@/components/ui/tooltip/tooltip";
import './globals.css'
import { ActionProvider } from "@/components/actions/ActionProvider";

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
              <ActionProvider>
                <TooltipProvider delay={150}>
                  {children}
                </TooltipProvider>
              </ActionProvider>
            </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}