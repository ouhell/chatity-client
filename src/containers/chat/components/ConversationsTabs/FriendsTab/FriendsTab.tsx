import useGetFriends from "@/hooks/api/queries/useGetFriends";
import { Plus } from "lucide-react";
import { useState } from "react";
import debounce from "lodash/debounce";
import React from "react";
import { FetchFriendsFilter } from "@/types/api/requests/friends";
import FriendAdder from "../../FriendAdder/FriendAdder";

import FriendItem from "./FriendItem/FriendItem";
const FriendsTab = () => {
  const [search, setSearch] = useState("");
  const setUsernameFilter = React.useMemo(() => {
    return debounce((val: string) => {
      setSearch(val);
    }, 200);
  }, []);
  const [openAdder, setOpenAdder] = useState(false);
  const filter: FetchFriendsFilter = React.useMemo(() => {
    return {
      username: search.trim() || undefined,
    };
  }, [search]);
  const { data: friends, isLoading, isError } = useGetFriends(filter);

  React.useEffect(() => {
    console.log("friends", friends);
  }, [friends]);
  return (
    <div>
      <FriendAdder
        open={openAdder}
        onClose={() => {
          setOpenAdder(false);
        }}
      />
      <div className="flex gap-2">
        <input
          onChange={(e) => {
            setUsernameFilter(e.target.value);
          }}
          type="text"
          className={
            "outline outline-1 outline-slate-300   hover:outline-slate-400 focus-within:outline-slate-600 transition-colors rounded w-full text-slate-600 pl-2 py-1"
          }
          placeholder="search"
        />
        <button
          onClick={() => {
            setOpenAdder(true);
          }}
          className="py-1 px-1.5 focus-visible:outline-2 focus-visible:outline-slate-800  rounded text-slate-600 hover:text-slate-800  outline outline-1 outline-slate-200 hover:outline-slate-400 active:outline-slate-600  transition-colors "
        >
          <Plus className="size-5 " />
        </button>
      </div>

      <div className="">
        {friends && !!friends.length && (
          <div className="py-4 flex flex-col gap-4">
            {friends.map((friendship) => {
              return (
                <FriendItem key={friendship.conversationId} data={friendship} />
              );
            })}
          </div>
        )}

        {friends && !friends.length && <div>Empty</div>}
        {!friends && isLoading && <div>Loading</div>}
        {!friends && isError && <div>Error</div>}
      </div>
    </div>
  );
};

export default FriendsTab;
