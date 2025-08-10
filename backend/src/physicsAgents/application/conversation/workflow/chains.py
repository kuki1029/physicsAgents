from langchain_groq import ChatGroq
from physicsAgents.settings import settings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from physicsAgents.domain.prompts import PHYSICIST_CHARACTER_CARD


def get_agent_response_chain():
    model = ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model_name=settings.GROQ_LLM_MODEL,
        temperature=0.7,
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", PHYSICIST_CHARACTER_CARD.prompt),
            MessagesPlaceholder(variable_name="messages"),
        ],
        # Can use other formats like f-string but jinja2 offers most flexibility and syntax
        template_format="jinja2",
    )

    return prompt | model
