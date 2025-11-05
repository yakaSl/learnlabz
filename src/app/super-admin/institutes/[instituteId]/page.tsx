
import InstituteProfilePage from "@/components/super-admin/institutes/details/institute-profile-page";

export default async function SuperAdminInstituteDetailPage({ params }: { params: { instituteId: string } }) {
    const { instituteId } = params;
    return <InstituteProfilePage instituteId={instituteId} />;
}
