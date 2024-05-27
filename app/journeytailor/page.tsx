'use client'

import { log } from "utils/util"
import CreateForm from "./Create"
import Result from "./Result"
import { fetchAIPlan } from "actions/content"
import { Spinner } from "@nextui-org/react"
import toast from "react-hot-toast"

export interface IAIResponse {
    city: string,
    execution_time: number,
    suggestion: {
        [date: string]: {
            [sort: string]: {
                [place: string]: {
                    distance?: string;
                    duration_m?: string;
                    text: string;
                    costtime?: string;
                }
            }
        }
    }
}

export default function JourneyTailor() {
    const [componentIndex, setComponentIndex] = useState(0)
    const [result, setResult] = useState<IAIResponse>()
    const [loading, setLoading] = useState(false)

    const handleGenerate = async (props: any) => {
        log('props', props)
        setLoading(true)
        const f = new FormData()
        Object.entries(props).forEach(item => {
            const [k, v] = item
            f.append(k, v as any)
        })
        // return
        try {
            const data = await fetchAIPlan(f)
            setResult(data)
            setComponentIndex(1)
        } catch(err) {
            toast.error(err.message)
        } finally {
            setLoading(false)
        }
    }

    return <div>
        {
            loading && <div className="fixed left-0 top-20 z-10 w-full h-screen pb-24 flex items-center justify-center backdrop-blur-md bg-opacity-25">
                <Spinner label="Generating......" color="default" />
            </div>
        }
        {
            componentIndex === 0 && <CreateForm onSubmit={handleGenerate} />
        }
        {
            (componentIndex === 1 && result) && <Result result={result} onBack={() => setComponentIndex(0)} />
        }
    </div>
}

