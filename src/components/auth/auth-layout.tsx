
import Image from "next/image";
import Link from "next/link";

interface AuthLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export default function AuthLayout({ title, description, children }: AuthLayoutProps) {
    return (
        <div className="w-full lg:grid lg:min-h-[100dvh] lg:grid-cols-2 xl:min-h-[100dvh]">
            <div className="flex items-center justify-center py-12">
                <div className="mx-auto grid w-[350px] gap-6">
                    <div className="grid gap-2 text-center">
                        <Link href="/" className="mb-4">
                            <Image src="/logo/logo.png" alt="LearnLabz Logo" width={200} height={40} className="bg-white p-2 rounded-md mx-auto" />
                        </Link>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <p className="text-balance text-muted-foreground">
                            {description}
                        </p>
                    </div>
                    {children}
                </div>
            </div>
            <div className="hidden bg-muted lg:block">
                <Image
                    src="https://picsum.photos/seed/auth-image/1200/900"
                    alt="Image"
                    width="1920"
                    height="1080"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                    data-ai-hint="inspirational education"
                />
            </div>
        </div>
    );
}
