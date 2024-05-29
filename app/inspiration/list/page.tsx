'use client'

import { contentList } from "actions/content";
import { Filter } from "./Filter";
import { log } from "utils/util";
import { List } from "./List";
import { Skeleton, Spinner } from "@nextui-org/react";
import { notification } from "utils/notification";
import clsx from "clsx";
import Link from "next/link";

const pageSize = 20

interface ISearchOption {
    page: number,
    page_size: number,
    accountAddress?: string,
    title?: string,
    description?: string,
}

export default function InspirationListPage() {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState([])
    const [searchOption, setSearchOption] = useState<ISearchOption>({
        page: 1,
        page_size: pageSize,
    })

    useEffect(() => {
        search()
    }, [searchOption])

    const search = async () => {
        setLoading(true)
        const res = await contentList(searchOption)
        setList(res.data.records)
        setLoading(false)
    }

    const handleFilter = async (p) => {
        setSearchOption({
            ...searchOption,
            ...p,
        })
    }

    const handlePageChange = (page: number) => {
        let targetPage = searchOption.page + page
        if (targetPage < 1) {
            targetPage = 1
        } else if (list.length < searchOption.page_size) {

        }
        setSearchOption({
            ...searchOption,
            page: targetPage
        })
    }

    return <div className="w-full">
        <h1 className="text-center text-5xl font-bold mt-14 mb-10">Discover travel inspiration</h1>

        <div className="flex p-4">
            <Filter loading={loading} onFilter={handleFilter} />

            <div className="w-full">
                <List loading={loading} list={list} />
                <footer className="w-[120px] mx-auto border-2 rounded-badge flex items-center justify-between px-6 py-2 mt-6">
                    <div className="cursor-pointer flex items-center justify-center" onClick={() => handlePageChange(-1)}>
                        <span
                            className={clsx([
                                "icon-[ic--baseline-chevron-left] text-2xl",
                                searchOption.page === 1 ? 'text-gray-300 cursor-not-allowed' : '',
                            ])}
                        ></span>
                    </div>
                    <div className="cursor-pointer flex items-center justify-center" onClick={() => handlePageChange(1)}>
                        <span className="icon-[ic--baseline-chevron-right] text-2xl"></span>
                    </div>
                </footer>
            </div>
        </div>

        <div className=" fixed right-8 bottom-8 z-10 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 bg-main">
            <Link href='/inspiration/publish' className="icon-[ic--baseline-plus] text-white text-2xl">
            </Link>
        </div>

    </div>
}
