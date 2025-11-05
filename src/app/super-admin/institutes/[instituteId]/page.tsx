
import InstituteProfilePage from "@/components/super-admin/institutes/details/institute-profile-page";

export default async function SuperAdminInstituteDetailPage({ params }: { params: Promise<{ instituteId: string }> }) {
    const { instituteId } = await params;
    return <InstituteProfilePage instituteId={instituteId} />;
}
