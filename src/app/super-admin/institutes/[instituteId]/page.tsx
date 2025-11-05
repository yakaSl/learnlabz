
import InstituteProfilePage from "@/components/super-admin/institutes/details/institute-profile-page";

export default function SuperAdminInstituteDetailPage({ params }: { params: { instituteId: string } }) {
    return <InstituteProfilePage instituteId={params.instituteId} />;
}
