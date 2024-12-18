import { Plus } from "lucide-react";

const PublicTab = () => {
  return (
    <div>
      <div className="flex gap-2">
        <input
          className="outline  outline-1 focus:outline-2 focus:outline-slate-500 hover:outline-2 outline-slate-300 rounded w-full pl-2 py-1 transition-all "
          placeholder="search"
          prefix="idk bro"
        />
        <button
          type="button"
          className="text-slate-600 border py-1 px-1.5 rounded hover:text-slate-800 hover:border-slate-500 transition-colors"
        >
          <Plus className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default PublicTab;
