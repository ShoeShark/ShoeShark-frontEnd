import { Filter } from "./Filter";
import { log } from "utils/util";

export default async function InspirationListPage() {

    return <div className="w-full">
        <h1 className="text-center text-5xl font-bold mt-14 mb-10">Discover travel inspiration</h1>

        <div className="flex p-4">
            <Filter />

            <div className="grid sm:grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-6 grow ml-8">
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        body
                    </div>
                </div>
            </div>
        </div>
    </div>
}

