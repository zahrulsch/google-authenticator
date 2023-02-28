import { invoke } from "@tauri-apps/api"
import { useState, useEffect } from "react"

export interface ErrorIpc {
    name: string
    cause: string
}

export interface IpcOptions<D = any, E = any> {
    activeOnInitial?: boolean
    onError?: (e: E) => void
    onSuccess?: (data: D) => void
}

export interface Ipc {
    add_profile: {
        payload: {
            name: string
            authCode: string
        }
        response: string
        error: ErrorIpc
    }
    get_profiles: {
        payload: {
            name?: string
            page?: number
        }
        response: {
            count: number
            items: Array<{
                auth_code: string
                created_at: string
                description: any
                id: number
                name: string
            }>
            pages: number
        }
        error: ErrorIpc
    }
}

function sendQuery<T extends keyof Ipc, K extends Ipc>(
    target: T,
    payload: K[T]["payload"] | null,
    options?: IpcOptions<K[T]["response"], K[T]["error"]>
) {
    const [data, setData] = useState<K[T]["response"] | null>(null)
    const [error, setError] = useState<K[T]["error"] | null>(null)
    const [pending, setPending] = useState<boolean>(false)

    const fn = async (pload: K[T]["payload"]) => {
        setPending(true)
        setError(null)

        try {
            const response = await invoke<K[T]["response"]>(target, pload)
            setData(response)
            options?.onSuccess?.(response)

            return response
        } catch (e: any) {
            const error = e as K[T]["error"]
            setError(error)
            options?.onError?.(error)
        } finally {
            setPending(false)
        }
    }

    useEffect(() => {
        if (options?.activeOnInitial) {
            if (payload) {
                fn(payload)
            }
        }
    }, [])

    return {
        data,
        error,
        pending,
        fn,
    }
}

export default sendQuery
