'use client'

import clsx from 'clsx'
import { IAIResponse } from "./page";
import { useRouter } from 'next/navigation';

interface IActivity {
    order: string;
    place: string;
    distance?: string;
    duration_m?: string;
    text: string;
    costtime?: string;
}

export default function Result({ result, onBack }: {
    result: IAIResponse;
    onBack: Function;
}) {
    const res: IAIResponse = {
        "city": "厦门市",
        "execution_time": 11.173502206802368,
        "suggestion": {
            "2024-05-15": {
                "1": {
                    "北京方恒假日酒店": {
                        "distance": "0.20",
                        "duration_m": "1",
                        "text": "居住位置"
                    }
                },
                "2": {
                    "苏山": {
                        "costtime": "3",
                        "distance": "0.20",
                        "duration_m": "1",
                        "text": "苏山是苏州的标志性山脉，您可以在这里爬山锻炼身体，欣赏苏州的美景。建议您在山脚下尝试当地特色美食，预计活动费用为200元，建议游玩时间为3小时。"
                    }
                },
                "3": {
                    "平江路美食街": {
                        "costtime": "2",
                        "text": "平江路美食街是苏州著名的美食街区，您可以品尝到各种当地特色美食。建议您在这里尝试特色小吃，预计活动费用为150元，建议游玩时间为2小时。"
                    }
                }
            },
            "2024-05-16": {
                "1": {
                    "北京方恒假日酒店1": {
                        "distance": "0.20",
                        "duration_m": "1",
                        "text": "居住位置"
                    }
                },
                "2": {
                    "苏山": {
                        "costtime": "3",
                        "distance": "0.20",
                        "duration_m": "1",
                        "text": "苏山是苏州的标志性山脉，您可以在这里爬山锻炼身体，欣赏苏州的美景。建议您在山脚下尝试当地特色美食，预计活动费用为200元，建议游玩时间为3小时。"
                    }
                },
                "3": {
                    "平江路美食街": {
                        "costtime": "2",
                        "text": "平江路美食街是苏州著名的美食街区，您可以品尝到各种当地特色美食。建议您在这里尝试特色小吃，预计活动费用为150元，建议游玩时间为2小时。"
                    }
                }
            },
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

    const suggestionArray = Object.entries(result.suggestion).map(([date, activities]) => {
        return {
            date,
            activities: Object.entries(activities).map(([order, details]) => {
                const [place, info] = Object.entries(details)[0];
                return { order, place, ...info };
            })
        };
    });

    const router = useRouter()
    const [selected, setSelected] = useState<number>(0)
    const [activities, setActivities] = useState<IActivity[]>(suggestionArray.length > 0 ? suggestionArray[0].activities : [])

    const onSelect = (index: number) => {
        setSelected(index)
        const s = suggestionArray[index].activities
        setActivities(s)
    }

    return <div>
        <div className='px-8 pt-8'>
            <div onClick={() => onBack()} className="icon-[ic--baseline-arrow-back] cursor-pointer text-3xl text-[#f31260]"></div>
        </div>

        <div className="flex items-start px-48 pt-12">
            {/* left */}
            <section className="w-[640px] flex items-center justify-around">
                <ul className="list-none w-full">
                    {
                        suggestionArray.map((suggestion, index) => {
                            return <li
                                key={suggestion.date}
                                onClick={() => onSelect(index)}
                                className={clsx([
                                    'flex justify-between items-center rounded-btn py-2 px-4 mb-4 cursor-pointer',
                                    index === selected ? 'border-2 border-[#f31260]' : 'border border-gray-300',
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
                <div className="icon-[ic--round-double-arrow] mx-12 text-6xl text-gray-400"></div>
            </section>

            {/* right */}
            <section>
                {
                    activities.map((activity: IActivity) => {
                        return <div className='text-gray-500 w-full' key={activity.order}>
                            {/* card content */}
                            <div className={clsx([
                                    'bg-[#f31260bb] card text-white',
                                    ' w-full rounded-lg p-4',
                                ])}
                            >
                                <div className='text-lg font-bold mb-2'>{activity.place}</div>
                                <div>{activity.text}</div>
                                {
                                    Number(activity.costtime) > 0 && <div className='pt-2'>
                                        <div className='badge'>{activity.costtime}h</div>
                                    </div>
                                }
                            </div>

                            {/* divider content */}
                            {
                                Number(activity.duration_m) > 0 && <div className='flex items-center'>
                                    <div className='border-r border-1 border-[#f3126099] ml-12 h-[80px] w-0'></div>
                                    <div className="icon-[ic--sharp-directions-bus] text-2xl mx-2 text-[#f3126099]"></div>
                                    <div className='text-lg text-[#f3126099]'>{activity.duration_m}h</div>
                                </div>
                            }
                        </div>
                    })
                }
            </section>

        </div>
    </div>
}
