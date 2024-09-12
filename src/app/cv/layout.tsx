
export default function CVLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className={`flex h-screen w-screen w-full h-full bg-gray`}>
            {children}
        </div>
    )
}