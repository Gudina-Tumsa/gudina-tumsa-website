// import { ChevronDown } from "lucide-react";

import {BookData} from "@/types/book";
import {useRouter} from "next/navigation";
import {createUserBookInteraction} from "@/lib/api/userbookinteraction";
import {useSelector} from "react-redux";
import {RootState} from "@/app/store/store";

const BookActions = ({bookData } : {bookData : BookData}) => {
    const router = useRouter();
    const user = useSelector((state: RootState) => state.user);

    function saveBook(id: string, userId: string) {
        try{
            createUserBookInteraction({userId : userId,  bookId : id , interactionType : 'save'})
        }catch(err : unknown){
            console.log(err)
        }
    }


    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium flex-1 sm:flex-initial text-lg"
                onClick={()=>{

                    router.push(`/book/${bookData._id}`);

                }}
            >
                Read
            </button>

            <button
                className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium flex items-center gap-2 text-lg"
                onClick={()=>{
                    saveBook(bookData._id, user?.user?._id ?? "")
                }}
            >
                📖 Add to Library
                {/*<ChevronDown className="w-4 h-4" />*/}
            </button>


        </div>
    );
};

export default BookActions;
