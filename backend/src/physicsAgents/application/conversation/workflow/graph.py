from langgraph.graph import END, START, StateGraph
from physicsAgents.application.conversation.workflow.nodes import conversation_node
from physicsAgents.application.conversation.workflow.state import PhysicistState


# TODO: cache?
def initiate_workflow():
    """
    Initiates the workflow for the physics agents conversation.
    This function sets up the necessary components and starts the workflow.
    """
    graph_builder = StateGraph(PhysicistState)

    graph_builder.add_node("conversation", conversation_node)

    graph_builder.add_edge(START, "conversation")
    graph_builder.add_edge("conversation", END)

    return graph_builder


# For LangGraph Studio
graph = initiate_workflow().compile()
