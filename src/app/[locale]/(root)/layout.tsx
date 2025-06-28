import HomeHeader from "@/components/shared/header/home-header";

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    return (
        <div className='flex flex-col min-h-screen'>
            <HomeHeader/>
            <main className='flex-1 flex flex-col h-full'>
                {children}
            </main>
        </div>
    );
}