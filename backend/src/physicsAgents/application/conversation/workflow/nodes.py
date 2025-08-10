from physicsAgents.application.conversation.workflow.chains import (
    get_agent_response_chain,
)


async def conversation_node(state, config):
    conversation_chain = get_agent_response_chain()

    response = await conversation_chain.ainvoke(
        {
            "messages": state["messages"],
            "physicist_name": state["physicist_name"],
            "physicist_style": state["physicist_style"],
        },
        config,
    )

    return {"messages": response}
