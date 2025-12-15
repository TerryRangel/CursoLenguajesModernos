import type { ButtonHTMLAttributes } from "react";

type Props=ButtonHTMLAttributes<HTMLButtonElement> & {loading?:boolean}
export default function Button ({children,loading,className,... rest}:Props) {
    return (
        <button className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50 ${className}`} disabled={loading || rest.disabled} {...rest}>
            {loading && <span className="loading loading-spinner"/>} {children}
        </button>
    )
}