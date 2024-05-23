'use client'

import { log } from "utils/util"
import CreateForm from "./Create"
import Result from "./Result"
import { fetchAIPlan } from "actions/content"

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
    const [componentIndex, setComponentIndex] = useState(1)
    const [result, setResult] = useState<IAIResponse>()

    const handleGenerate = async (props: any) => {
        log('props', props)
        const f = new FormData()
        Object.entries(props).forEach(item => {
            const [k, v] = item
            f.append(k, v as any)
        })
        // return
        const data = await fetchAIPlan(f)
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

