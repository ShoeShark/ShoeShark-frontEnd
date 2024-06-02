'use client'

import { contentList, getContentByHash } from "actions/content";
import { Filter } from "./Filter";
import { Skeleton, Spinner } from "@nextui-org/react";
import { notification } from "utils/notification";
import clsx from "clsx";
import Link from "next/link";
import dynamic from "next/dynamic";
import { publicClient } from "config";
import { CONTENT_MANAGER } from "contracts/ContentManager"
import { formatBlockTimestamp } from "utils/format";

const pageSize = 20

interface ISearchOption {
    page: number,
    page_size: number,
    accountAddress?: string,
    title?: string,
    description?: string,
}

const LoadingList = () => <div className="w-full ml-8 py-10 px-8 max-h-full min-h-[34rem] bg-[#fff] rounded-lg shadow-md grid grid-cols-1 md:grid-cols-2 gap-5">
    {
        Array.from({ length: 10 }, (_, i) => i).map((i) =>
            <div className="skeleton h-64" key={i}></div>
        )
    }
</div>

const WithLoadingList = dynamic(
    () => import('./List'),
    {
        loading: LoadingList
    }
)

export default function InspirationListPage() {
    const [loading, setLoading] = useState(false)
    const [list, setList] = useState<Array<Record<string, any>>>([])
    const [searchOption, setSearchOption] = useState<ISearchOption>({
        page: 1,
        page_size: pageSize,
    })

    useEffect(() => {
        search()
    }, [searchOption])

    async function getContentList() {
        const hash_list = await publicClient.readContract({
            ...CONTENT_MANAGER,
            functionName: "getAllContent"
        })

        const list = await Promise.all(
            hash_list.map(getContentByHash)
        )

        return list.sort((p, n) => Number(n.createdAt - p.createdAt))
    }

    const search = async () => {
        setLoading(true)
        let list = await getContentList()
        if (searchOption.title) {
            list = list.filter(item => item.title.includes(searchOption.title))
        }
        if (searchOption.description) {
            list = list.filter(item => item.description.includes(searchOption.description))
        }

        // const res = await contentList(searchOption)
        setList(list)
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
        <h1 className="text-center text-4xl font-bold mt-10 mb-6">Discover travel inspiration</h1>

        <div className="flex p-4">
            <Filter loading={loading} onFilter={handleFilter} />

            <div className="w-full">
                {
                    loading ? <LoadingList /> : <WithLoadingList loading={loading} list={list} />
                }

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

        <div className="shadow-[0_0_22px_2px_#F31260] transition-all fixed right-8 bottom-8 z-10 rounded-full w-12 h-12 flex items-center justify-center cursor-pointer hover:scale-110 bg-main">
            <Link href='/inspiration/publish' className="icon-[ic--baseline-plus] text-white text-2xl">
            </Link>
        </div>

    </div>
}
