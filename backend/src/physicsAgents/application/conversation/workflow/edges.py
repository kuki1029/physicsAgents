from physicsAgents.application.conversation.workflow.state import PhysicistState
from typing_extensions import Literal
from langgraph.graph import END

MESSAGES_TO_KEEP = 10


def should_summarize(state: PhysicistState) -> Literal["summarize", "__end__"]:
    msgs = state["messages"]

    if len(msgs) > MESSAGES_TO_KEEP:
        return "summarize"

    return END
