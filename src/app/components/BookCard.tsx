/* eslint-disable  */
// @ts-nocheck

import { MoreHorizontal } from "lucide-react";
import {createUserBookInteraction} from "@/lib/api/userbookinteraction";

import {useRouter} from "next/navigation";

interface BookCardProps {
    id: string;
    userId: string;
    title: string;
    year: number;
    coverImage: string;
    writer: string;
    isCurrentlyReading?: boolean;
}
const BookCard = ({ id , userId , title, year, coverImage, writer, isCurrentlyReading }: BookCardProps) => {

    const router = useRouter();

    console.log(userId)
    // function saveBook(id: string, userId: string) {
    //     try{
    //         createUserBookInteraction({userId : userId,  bookId : id , interactionType : 'save'})
    //     }catch(err : unknown){
    //         console.log(err)
    //     }
    // }

    function readBookNavigate(id: string) {

        router.push(`/bookdetail/${id}`);

    }

    return (

        <div className="relative    group  p-6 transition-all duration-300 hover:bg-gray-100 rounded-lg overflow-hidden cursor-pointer "
        onClick={() => {
            readBookNavigate(id);
        }}
        >
            <div className="aspect-[3/4] bg-red-200 rounded-lg overflow-hidden relative]">
                <img
                    src={coverImage}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {isCurrentlyReading && (
                    <div className="absolute top-3 right-3 z-20">
                        <button className="p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="h-4 w-4 text-gray-600" />
                        </button>
                    </div>
                )}

                {/*<div className="absolute inset-0 flex flex-col space-y-2 items-center justify-center bg-black/30 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">*/}
                {/*    <button className="border border-white text-white text-sm font-medium px-3 py-1 rounded-md backdrop-blur-md bg-transparent hover:bg-white hover:text-black transition-all"*/}
                {/*            onClick={() => {*/}
                {/*                readBookNavigate(id);*/}
                {/*            }}*/}
                {/*    >*/}
                {/*        Read*/}
                {/*    </button>*/}
                {/*    <button*/}
                {/*        className="border border-white text-white text-sm font-medium px-3 py-1 rounded-md backdrop-blur-md bg-transparent hover:bg-white hover:text-black transition-all"*/}
                {/*        onClick={() => {*/}
                {/*            saveBook(id, userId);*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        Save*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

            <div className="mt-4 px-1">
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">{title}</h3>
                <p className="text-xs text-gray-600 mt-1 truncate">{writer}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{year}</p>
            </div>
        </div>
    );
};

export default BookCard;
