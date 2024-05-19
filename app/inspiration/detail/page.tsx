import { Comment } from "./Comment";
import { Donate } from "./Donate";


export default async function InspirationDetailPage() {
    return <div className="w-full">
        <header>
            <h1 className="text-center text-5xl font-bold mt-8 mb-4">title</h1>
            <div className="flex justify-center items-center">
                <div className="pr-16 text-xl">user</div>
                <div className="text-gray-500">2024</div>
            </div>
        </header>

        <div>
            content
        </div>

        <div className="text-center">
            <Donate />
            <Comment />
        </div>


    </div>
}
