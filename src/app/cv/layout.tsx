
export default function CVLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={`flex min-h-screen min-w-screen w-full h-full bg-gray text-white`}>
            {children}
        </div>
    )
}