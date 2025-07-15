from physicsAgents.application.conversation.workflow.chains import (
    get_agent_response_chain,
)


async def conversation_node(state, config):
    conversation_chain = get_agent_response_chain()

    response = await conversation_chain.ainvoke(
        {
            "messages": state["messages"],
        },
        config,
    )

    return {"messages": response}
