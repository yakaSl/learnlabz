
import NewExamPage from "@/components/tutor/classes/details/new-exam-page";

export default function CreateExamPage({ params }: { params: { classId: string } }) {
    return <NewExamPage classId={params.classId} />;
}
