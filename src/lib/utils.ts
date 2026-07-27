
import {ClassValue, clsx} from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Builds the auth-gated stream URL for a book's audio (used both for short
// "listen to summary" clips and for full audiobooks — the backend stores
// both under `audioSummarizationUrl`, distinguished by `contentType`). The
// endpoint normally reads a Bearer header, but <audio src="..."> requests
// are issued by the browser itself and can't carry custom headers, so the
// token rides along as a query param instead — that lets the browser hit
// the URL directly and use native HTTP range requests (streaming + seeking)
// rather than us pre-fetching the whole file into memory.
export function getAudioStreamUrl(audioUrl: string | null | undefined, token: string | null | undefined) {
    if (!audioUrl || !token) return null;
    const fileName = audioUrl.split('/').pop();
    return `${process.env.NEXT_PUBLIC_BASE_URL}/api/audio/stream/${fileName}?token=${encodeURIComponent(token)}`;
}
