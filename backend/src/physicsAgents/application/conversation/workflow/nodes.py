from physicsAgents.application.conversation.workflow.chains import (
    get_agent_response_chain,
    get_conversation_summary_chain,
)
from physicsAgents.application.conversation.workflow.state import PhysicistState
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import RemoveMessage

MESSAGES_TO_KEEP = 10


async def conversation_node(state: PhysicistState, config: RunnableConfig):
    conversation_chain = get_agent_response_chain()
    summary = state.get("summary", "")

    response = await conversation_chain.ainvoke(
        {
            "messages": state["messages"],
            "physicist_name": state["physicist_name"],
            "physicist_style": state["physicist_style"],
            "summary": summary,
        },
        config,
    )

    return {"messages": response}


# Summaries the conversation so far and only keeps recent messages
async def summarize_conversation_node(state: PhysicistState):
    summary = state.get("summary", "")
    summary_chain = get_conversation_summary_chain(summary)

    res = await summary_chain.ainvoke(
        {
            "messages": state["messages"],
            "physicist_name": state["physicist_name"],
            "summary": summary,
        }
    )

    # Delete messages except recent 10
    del_msgs = [
        RemoveMessage(id=msg.id) for msg in state["messages"][:-MESSAGES_TO_KEEP]
    ]

    return {"summary": res.content, "messages": del_msgs}
