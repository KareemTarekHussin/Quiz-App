import { CirclePlus, FilePenLine, Trash } from "lucide-react";
import { useGetGroupsQuery } from "../../../redux/Groups/groupSlice";
import { Group } from "../../../interfaces/interfaces";
import SkeletonCard from "../../../components/SkeletonCard/SkeletonCard";
import AddGroupModal from "./GroupsModal";

export default function Groups() {
  const { data: groupList, isLoading: groupLoading } = useGetGroupsQuery(0);
  console.log(groupList, "groupList");
  return (
    <>
    <AddGroupModal />
      <div>
        <div className="w-full flex justify-end mb-2">
          {groupLoading ? (
            <div className="flex items-center justify-between font-semibold">
              <h6 className="rounded-full h-[35px] w-[145px] bg-gray-500 animate-pulse">
              </h6>
            </div>
          ) : (
            <button className="p-2 rounded-3xl flex gap-1 border-[2px]">
              <CirclePlus /> Add Group
            </button>
          )}
        </div>
        <div className="border p-3">
          <p className="font-semibold text-lg mb-3">Groups List</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
            {groupLoading && Array.from({length: 2}, (_, i)=> <SkeletonCard key={i}/>)}
            {groupList?.map((group: Group) => (
              <div
                key={group._id}
                className="border p-2 flex items-center justify-between"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-lg font-semibold">Group : {group.name}</p>
                  <p className="text-sm">No of students : {group.max_students}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <FilePenLine className="cursor-pointer text-yellow-400" />
                  <Trash className="cursor-pointer text-red-600" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
