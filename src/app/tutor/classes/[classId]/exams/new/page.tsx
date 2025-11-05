
import NewExamPage from "@/components/tutor/classes/details/new-exam-page";

export default async function CreateExamPage({ params }: { params: { classId: string } }) {
    const { classId } = params;
    return <NewExamPage classId={classId} />;
}
