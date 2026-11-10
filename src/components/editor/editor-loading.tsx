export function EditorLoading() {
    return (
        <div className="flex min-h-full flex-col bg-[#f9fbfd]">
            <div className="bg-white px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="h-8 w-48 rounded bg-black/[0.06]" />
                    <div className="h-10 w-24 rounded-full bg-[#c2e7ff]" />
                </div>
                <div className="mt-3 h-8 rounded-full bg-[#edf2fa]" />
            </div>
            <div className="flex flex-1 justify-center px-4 py-8">
                <div className="h-[70vh] w-full max-w-[816px] bg-white shadow-[0_1px_3px_1px_rgba(60,64,67,0.15)]" />
            </div>
        </div>
    );
}
