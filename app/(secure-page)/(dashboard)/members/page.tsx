"use client";
import InviteMembers from "@/components/helpers/my_peoples/inviteMembers";
import MyPeoplesDataTables, {
  MyPeoplesDataColumns,
} from "@/components/helpers/my_peoples/myPoplesDataTable";
import { ApiMethod, InviteMembersUrls } from "@/shared/utils/enums/apiEnums";
import { useLazyGetApi } from "@/shared/utils/hooks/lazyGetApi";
import { useAppSelector } from "@/shared/utils/hooks/redux-hook";
import { myTableInterface } from "@/shared/utils/interfaces/my_table_interface";
import { useGetMethodQuery } from "@/shared/utils/services/dataServices";
import { StringFormatService } from "@/shared/utils/services/stringFormatService";
import { useEffect, useState } from "react";


export default function MyPeoples() {

  const [invitedMembers, setInvitedMembers] = useState<myTableInterface[]>([]);
  const user = useAppSelector((state) => state.user);
  
  const {data:getMembers, isError,isLoading,}= useGetMethodQuery({
    httpResponse:{
      reqType: ApiMethod.GET,
      url: StringFormatService(InviteMembersUrls.getInvites,[user.homeId]),
      headers: user.token,
    }
  })

  useEffect(()=>{
    if(getMembers){
      setInvitedMembers(getMembers?.response?.invites)
    }
  },[isLoading,getMembers])
  


  return (
    <div className="mx-3">
      <div className="flex items-end  justify-between mb-4">
        <h3 className="font-semibold ">My peoples</h3>
        <InviteMembers />
      </div>
      <MyPeoplesDataTables
        columns={MyPeoplesDataColumns}
        data={invitedMembers}
      />
    </div>
  );
}
