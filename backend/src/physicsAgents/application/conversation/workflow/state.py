from langgraph.graph import MessagesState


class PhysicistState(MessagesState):
    """
    Template state for langraph workflow. Keeps track of information necessary to make it seem like a real
    chat bot to user.
    """

    physicist_name: str
    physicist_style: str
    summary: str
