'use client'

import clsx from 'clsx'
import { IAIResponse } from "./page";

export default function Result({ result }: {
    result: IAIResponse
}) {
    const res: IAIResponse = {
        "city": "厦门市",
        "execution_time": 11.173502206802368,
        "suggestion": {
            "2024-06-10": "推荐您前往鼓浪屿，可以体验爬山的乐趣，同时品尝当地特色美食，预算3000元可以在岛上找到不错的食宿选择。",
            "2024-06-11": "建议您前往环岛路进行徒步爬山，沿途可以品尝到各种美食，预算3000元可以享受到岛上的特色美食和风景。",
            "2024-06-12": "推荐您前往日光岩，可以体验爬山的乐趣，同时在岛上尝试各种特色美食，预算3000元可以满足您的需求。",
            "2024-06-13": "建议您参加厦门市的美食文化节活动，可以尝试到各种特色美食，同时可以在市区附近进行轻松的爬山活动。",
            "2024-06-14": "推荐您前往海边进行散步，欣赏美丽的海景，然后到市区尝试各种美食，预算3000元可以在厦门市享受到美食和自然风光。"
        }
    }
    const formatDateByType = (date: string, type: string) => {
        const str = new Date(date).toDateString()
        const [week, month, day, year] = str.split(' ')
        if (type === 'week') {
            return week
        }
        if (type === 'date') {
            return `${month} ${day}`
        }
        return date
    }
    const suggestionsByData = (res: IAIResponse) => {
        return Object.entries(res.suggestion).map(([key, value]) => ({
            date: key,
            text: value,
        }))
    }
    const suggestions = suggestionsByData(res)

    const [selected, setSelected] = useState<number>(0)
    const [content, setContent] = useState<string>(suggestions.length > 0 ? suggestions[0].text : "")

    const onSelect = (index: number) => {
        setSelected(index)
        setContent(suggestions[index].text)
    }

    return <div className="flex items-start px-24 pt-12">
        <section className="w-2/5 flex items-center justify-around">
            <ul className="list-none w-2/3">
                {
                    suggestions.map((suggestion, index) => {
                        return <li
                            key={suggestion.date}
                            onClick={() => onSelect(index)}
                            className={clsx([
                                'flex justify-between items-center rounded-btn py-2 px-4 mb-2 cursor-pointer',
                                index === selected ? 'ring-2' : 'border border-gray-300',
                            ])}
                        >
                            <div>
                                <p className="my-0">{formatDateByType(suggestion.date, 'week')}</p>
                                <p className="my-0">{formatDateByType(suggestion.date, 'date')}</p>
                            </div>
                            <p>Day {index + 1}</p>
                        </li>
                    })
                }
            </ul>
            <span className="icon-[ic--round-double-arrow] text-6xl"></span>
        </section>

        <div className="card w-3/5 shadow-xl">
            <div className="card-body">
                {content}
            </div>
        </div>
    </div>
}
