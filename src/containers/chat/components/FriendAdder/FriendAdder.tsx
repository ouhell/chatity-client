import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import useGetUsers from "@/hooks/api/queries/useGetUsers";
import { FetchUsersFilter } from "@/types/api/requests/users";
import { cn } from "@/utils/libs/classNames";
import { debounce } from "lodash";
import { File, Loader2, Search, UsersRound, X } from "lucide-react";
import { AnimatePresence, motion as m } from "motion/react";
import React from "react";
import UserAvatar from "../UserAvatar/UserAvatar";
type Props = {
  open: boolean;
  onClose?: () => void;
};

const FriendAdder = ({ open, onClose }: Props) => {
  const [search, setSearch] = React.useState("");
  const searchFilter = React.useMemo(() => search.trim(), [search]);
  const setSearchFilter = React.useMemo(
    () =>
      debounce(
        (val: string) => {
          setSearch(val);
        },
        400,
        {
          leading: true,
        }
      ),
    []
  );
  const user = useSession(true)!.sessionUser!;
  const queryFilter: FetchUsersFilter = React.useMemo(() => {
    return {
      exclude: [user.id],
      username: searchFilter || undefined,
    };
  }, [searchFilter, user.id]);
  const {
    data: users,
    isLoading,
    isFetching,
    isError,
  } = useGetUsers(queryFilter, {
    enabled: !!searchFilter,
    placeholderData: (data) => data,
  });

  return (
    <AnimatePresence>
      {open ? (
        <m.div
          className={cn("fixed top-0 left-0 right-0 bottom-0 z-[100]", {})}
        >
          <m.div
            className="h-full bg-slate-200/30 p-4 backdrop-blur-sm overflow-x-auto"
            onClick={() => {
              onClose?.();
            }}
          >
            <m.div
              //   initial={{
              //     y: -200,
              //   }}
              //   animate={{
              //     y: 0,
              //   }}
              className="min-h-40 bg-white rounded border max-w-[40rem] mx-auto mt-20"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className=" p-4 flex justify-between items-center">
                <div className="text-xl font-semibold">Add Friends</div>
                <button
                  onClick={() => {
                    onClose?.();
                  }}
                  className="size-8 grid place-items-center rounded-full hover:bg-slate-200/40 active:bg-slate-300/40 transition-color"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className=" ">
                <div className="flex gap-4 items-center px-8 ">
                  <input
                    type="search"
                    className="w-full rounded px-1.5 py-1.5 outline outline-1 outline-slate-200 hover:outline-slate-300 focus-within:outline-2 focus-within:outline-slate-300 transition-colors"
                    placeholder="Search"
                    onChange={(e) => {
                      setSearchFilter(e.target.value);
                    }}
                  />
                  <button className="px-2 py-1.5 border rounded text-slate-500 hover:text-slate-700 hover:border-slate-300 transition-colors">
                    {isFetching ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Search className="size-5" />
                    )}
                  </button>
                </div>
                <div className="p-4 min-h-40 relative">
                  {!!searchFilter && !!users && !!users.length && (
                    <div className="p-4">
                      {users.map((user) => {
                        return (
                          <div
                            key={user.id}
                            className="flex gap-4 items-center p-4 border rounded"
                          >
                            <div>
                              <UserAvatar
                                username={user.username}
                                img={user.imgUrl}
                                size={2.7}
                              />
                            </div>
                            <div>{user.username}</div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {!!searchFilter && !!users && !users.length && (
                    <div className=" flex gap-2  items-center absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-lg opacity-70">
                      <span>
                        <File />
                      </span>
                      <span>Empty</span>
                    </div>
                  )}

                  {!!searchFilter && !users && isLoading && (
                    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-lg ">
                      Loading....
                    </div>
                  )}
                  {!!searchFilter && !users && isError && (
                    <div className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 text-red-500">
                      Error
                    </div>
                  )}
                  {!searchFilter && (
                    <div className="flex items-center gap-2 absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 opacity-80">
                      <span>
                        <UsersRound />
                      </span>
                      <span>Search Users</span>
                    </div>
                  )}
                </div>
              </div>
            </m.div>
          </m.div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
};

export default FriendAdder;
