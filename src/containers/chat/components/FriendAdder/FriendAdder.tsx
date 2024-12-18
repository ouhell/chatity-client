import { useSession } from "@/context/UserSessionContext/UserSessionContext";
import useGetUsers from "@/hooks/api/queries/useGetUsers";
import { FetchUsersFilter } from "@/types/api/requests/users";
import { cn } from "@/utils/libs/classNames";
import { debounce } from "lodash";
import { Loader2, Search, X } from "lucide-react";
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
            className="h-full bg-slate-200/30 p-4 backdrop-blur-sm"
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
              <div className="h-20 p-4 flex justify-between">
                <div></div>
                <button
                  onClick={() => {
                    onClose?.();
                  }}
                  className="size-8 grid place-items-center rounded-full hover:bg-slate-200/40 active:bg-slate-300/40 transition-color"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="mt-4 ">
                <div className="flex gap-4 items-center px-8 ">
                  <input
                    type="search"
                    className="w-full rounded px-1.5 py-1.5 outline outline-1 outline-slate-200 hover:outline-slate-300 focus-within:outline-2 focus-within:outline-slate-400 transition-colors"
                    placeholder="Search"
                    onChange={(e) => {
                      setSearchFilter(e.target.value);
                    }}
                  />
                  <button className="px-2 py-1.5 border rounded text-slate-500">
                    {isFetching ? (
                      <Loader2 className="size-5 animate-spin" />
                    ) : (
                      <Search className="size-5" />
                    )}
                  </button>
                </div>
                <div className="p-4">
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
                    <div>Empty</div>
                  )}

                  {!!searchFilter && !users && isLoading && (
                    <div>Loading....</div>
                  )}
                  {!!searchFilter && !users && isError && <div>Error</div>}
                  {!searchFilter && <div>Search Users</div>}
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
