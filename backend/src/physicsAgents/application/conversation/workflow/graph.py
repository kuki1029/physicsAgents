from langgraph.graph import END, START, StateGraph
from physicsAgents.application.conversation.workflow.nodes import (
    conversation_node,
    summarize_conversation_node,
)
from physicsAgents.application.conversation.workflow.edges import should_summarize
from physicsAgents.application.conversation.workflow.state import PhysicistState


# TODO: cache?
def initiate_workflow():
    """
    Initiates the workflow for the physics agents conversation.
    This function sets up the necessary components and starts the workflow.
    """
    graph_builder = StateGraph(PhysicistState)

    graph_builder.add_node("conversation", conversation_node)
    graph_builder.add_node("summarize", summarize_conversation_node)

    graph_builder.add_edge(START, "conversation")
    graph_builder.add_conditional_edges("conversation", should_summarize)
    graph_builder.add_edge("summarize", END)

    return graph_builder


# For LangGraph Studio
graph = initiate_workflow().compile()
