import ConversationTabs from "../components/ConversationsTabs/ConversationTabs";
import Conversations from "../components/Converations/Conversations";

const ConversationsPage = () => {
  return (
    <main className="bg-slate-50 px-4 pt-2 pb-4 flex-1 flex flex-col">
      <div className="border  flex-1 bg-white rounded mt-4 flex gap-4 p-4">
        <ConversationTabs />
        <div className="w-0.5 bg-gray-400 rounded-lg"></div>
        <Conversations />
      </div>
    </main>
  );
};

export default ConversationsPage;
