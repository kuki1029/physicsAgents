from physicsAgents.application.conversation.workflow.graph import initiate_workflow


async def get_chat_response(messages: str) -> str:
    """
    TODO: ADD IN
    """
    graph = initiate_workflow().compile()

    try:
        output = await graph.ainvoke(input={"messages": messages})
        msg = output["messages"][-1]
        return msg.content
    except Exception as e:
        raise RuntimeError(f"Could not get response: {str(e)}") from e
