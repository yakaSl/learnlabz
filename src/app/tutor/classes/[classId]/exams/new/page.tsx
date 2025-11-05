
import NewExamPage from "@/components/tutor/classes/details/new-exam-page";

export default async function CreateExamPage({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = await params;
    return <NewExamPage classId={classId} />;
}
