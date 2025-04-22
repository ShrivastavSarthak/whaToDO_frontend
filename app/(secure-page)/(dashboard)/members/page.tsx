import InviteMembers from "@/components/helpers/my_peoples/inviteMembers";
import MyPeoplesDataTables, {
  MyPeoplesDataColumns,
} from "@/components/helpers/my_peoples/myPoplesDataTable";

// TODO: DUMMY DATA DELETED AFTER THE API CALL
const myPeoplesDummyData = [
  {
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    isConnected: "Connected",
    withdrawalInvitation: "Withdraw",
    resendInvitation: "Resend",
    InvitationSendDate: "2025-04-10",
  },
  {
    name: "Bob Smith",
    email: "bob.smith@example.com",
    isConnected: "Pending",
    withdrawalInvitation: "Withdraw",
    resendInvitation: "Resend",
    InvitationSendDate: "2025-03-28",
  },
  {
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    isConnected: "Not Connected",
    withdrawalInvitation: "Withdraw",
    resendInvitation: "Resend",
    InvitationSendDate: "2025-02-15",
  },
  {
    name: "Diana Prince",
    email: "diana.prince@example.com",
    isConnected: "Connected",
    withdrawalInvitation: "Withdraw",
    resendInvitation: "Resend",
    InvitationSendDate: "2025-01-09",
  },
  {
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    isConnected: "Pending",
    withdrawalInvitation: "Withdraw",
    resendInvitation: "Resend",
    InvitationSendDate: "2024-12-22",
  },
];

export default function MyPeoples() {
  return (
    <div className="mx-3">
      <div className="flex items-end  justify-between mb-4">
        <h3 className="font-semibold ">My peoples</h3>
        <InviteMembers />
      </div>
      <MyPeoplesDataTables
        columns={MyPeoplesDataColumns}
        data={myPeoplesDummyData}
      />
    </div>
  );
}
