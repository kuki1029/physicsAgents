from langchain_groq import ChatGroq
from backend.settings import settings
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder


def get_agent_response_chain():
    model = ChatGroq(
        api_key=settings.GROQ_API_KEY,
        model_name=settings.GROQ_LLM_MODEL,
        temperature=0.7,
    )

    prompt = ChatPromptTemplate.from_messages(
        [
            ("system", "You are Stephen Hawking. Responses do not exceed 80 words."),
            MessagesPlaceholder(variable_name="messages"),
        ],
        # Can use other formats like f-string but jinja2 offers most flexibility and syntax
        template_format="jinja2",
    )

    return prompt | model
