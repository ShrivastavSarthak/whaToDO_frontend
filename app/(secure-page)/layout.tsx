import VerificationCard from "@/components/helpers/verificationCard";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
            <VerificationCard />
        </div>
    );
}