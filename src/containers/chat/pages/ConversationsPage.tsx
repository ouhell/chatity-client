import ConversationTabs from "../components/ConversationsTabs/ConversationTabs";
import Conversations from "../components/Converations/Conversations";

const ConversationsPage = () => {
  return (
    <main className="bg-slate-50 px-4 pt-2 pb-4 max-h-full h-full overflow-auto flex flex-col ">
      <div className="border  h-full   bg-white rounded mt-4 flex gap-4 p-4 overflow-hidden">
        <ConversationTabs />
        <div className="w-0.5 bg-gray-400 rounded-lg"></div>

        <Conversations />
      </div>
      {/* 
      <div
        style={{ height: 2000 }}
        className=" shrink-0 bg-red-300 bg-gradient-to-b from-blue-500 to-red-500 "
      ></div> */}
    </main>
  );
};

export default ConversationsPage;
