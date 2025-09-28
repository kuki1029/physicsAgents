from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import tools_condition
from physicsAgents.application.conversation.workflow.nodes import (
    conversation_node,
    summarize_conversation_node,
    retriever_node,
    connector_node,
    summarize_context_node,
)
from physicsAgents.application.conversation.workflow.edges import should_summarize
from physicsAgents.application.conversation.workflow.state import PhysicistState
from functools import lru_cache


@lru_cache(maxsize=1)
def initiate_workflow():
    """
    Initiates the workflow for the physics agents conversation.
    This function sets up the necessary components and starts the workflow.
    """
    graph_builder = StateGraph(PhysicistState)

    # Define all nodes
    graph_builder.add_node("conversation", conversation_node)
    graph_builder.add_node("retrieve_physicist_context", retriever_node)
    graph_builder.add_node("summarize", summarize_conversation_node)
    graph_builder.add_node("connector", connector_node)
    graph_builder.add_node("summarize_context_node", summarize_context_node)

    # Make the graph structure
    graph_builder.add_edge(START, "conversation")
    graph_builder.add_conditional_edges(
        "conversation",
        tools_condition,
        {"tools": "retrieve_physicist_context", END: "connector"},
    )

    graph_builder.add_edge("retrieve_physicist_context", "summarize_context_node")
    graph_builder.add_edge("summarize_context_node", "conversation")
    graph_builder.add_conditional_edges("connector", should_summarize)
    graph_builder.add_edge("summarize", END)

    return graph_builder


# For LangGraph Studio
graph = initiate_workflow().compile()
