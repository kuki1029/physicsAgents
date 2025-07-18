from physicsAgents.application.conversation.workflow.graph import initiate_workflow
from typing import AsyncGenerator
from langchain_core.messages import AIMessageChunk


async def get_ws_chat_res(messages: str) -> AsyncGenerator[str, None]:
    """TODO"""
    graph = initiate_workflow().compile()

    try:
        async for text in graph.astream(
            input={"messages": messages}, stream_mode="messages"
        ):
            # TODO use types for conversation as its confusing
            if text[1]["langgraph_node"] == "conversation" and isinstance(
                text[0], AIMessageChunk
            ):
                yield text[0].content

    except Exception as e:
        raise RuntimeError(f"Cannot stream conversation flow: {str(e)}") from e


async def get_chat_response(messages: str) -> str:
    """
        Asynchronously generates a chat response from a compiled workflow graph.

    This function initializes and compiles a workflow graph, then invokes it
    asynchronously with the provided input message string. It retrieves the
    last message from the output and returns its content as the chat response.

    Args:
        messages (str): A string representing the user input or conversation history
                        to be processed by the workflow.

    Returns:
        str: The content of the final message generated by the workflow.

    Raises:
        RuntimeError: If the workflow invocation fails or any error occurs during execution.
    """
    graph = initiate_workflow().compile()

    try:
        output = await graph.ainvoke(input={"messages": messages})
        msg = output["messages"][-1]
        return msg.content
    except Exception as e:
        raise RuntimeError(f"Could not get response: {str(e)}") from e
