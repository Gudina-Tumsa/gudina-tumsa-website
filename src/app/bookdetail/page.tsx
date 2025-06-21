import BookCover from "@/app/components/bookdetail/BookCover";
import BookDetails from "@/app/components/bookdetail/BookDetails";
import BookActions from "@/app/components/bookdetail/BookActions";
import BookTabs from "@/app/components/bookdetail/BookTabs";
import SidebarLayout from "@/app/components/sidebar-layout";

const Index = () => {
    return (
        <SidebarLayout>
            <div className="min-h-screen mt-[6%]">
                {/* Header with subscribe notification */}
                <div className="">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        <div className="lg:col-span-1">
                            <BookCover />
                        </div>


                        <div className="lg:col-span-2">
                            <BookDetails />
                            <BookActions />
                            <div className="mt-8">
                                <BookTabs />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarLayout>

    );
};

export default Index;