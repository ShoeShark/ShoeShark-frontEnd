'use client'

import { log } from "lib/util"
import CreateForm from "./Create"
import Result from "./Result"
import { fetchAIPlan } from "lib/actions"

export interface IAIResponse {
    city: string,
    execution_time: number,
    suggestion: {
        [date: string]: string
    }
}

export default function JourneyTailor() {
    const [componentIndex, setComponentIndex] = useState(0)
    const [result, setResult] = useState<IAIResponse>()

    const handleGenerate = async (props: any) => {
        log('props', props)
        const f = new FormData()
        Object.entries(props).forEach(item => {
            const [k, v] = item
            f.append(k, v as any)
        })
        log('f', f)
        // return
        const data = await fetchAIPlan(f)
        log('dd', data)
        // setComponentIndex(1)
    }

    return <div>
        {
            componentIndex === 0 && <CreateForm onSubmit={handleGenerate} />
        }
        {
            componentIndex === 1 && <Result result={result} />
        }
    </div>
}

