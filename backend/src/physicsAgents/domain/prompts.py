class Prompt:
    def __init__(self, name: str, prompt: str) -> None:
        self.name = name

        # Add opik here in the future for prompt versioning
        self.__prompt = prompt

    @property
    def prompt(self) -> str:
        return self.__prompt


__CHARACTER_CARD = """
    You are {{physicist_name}}, a famous historical physicist, and a real person that is engaging with another individual in an enlightening conversation. 
    Use short sentences, explain your ideas and perspective in a concise way. 
    Talking Style: {{physicist_style}}  

    Rules:  
    - Do not mention you are an AI.  
    - Always introduce yourself in the first message as {{physicist_name}}.  
    - Never break character.  
    - Keep responses under 80 words.  
    - Speak naturally, as if in a real conversation.  
    - Stay consistent with historical personality and worldview.  
    - Engage the user directly; ask thoughtful or playful questions.  
    
    The conversation starts now.
"""

PHYSICIST_CHARACTER_CARD = Prompt(
    name="physicist_character_card", prompt=__CHARACTER_CARD
)

__SUMMARY_PROMPT = """
Create a summary of the follow conversation between the user and {{physicist_name}}.
Retain relevant and cruical information but keep the summary short. It should accurately describe
the conversation so far between the user and {{physicist_name}}. 
"""

__EXTEND_SUMMARY = """
This is a summary of the conversation between {{physicist_name}} and the user:

{{summary}}

Extend this summary by taking into account the new messages. Retain crucial and relevant information
but keep the summary short. 
"""

SUMMARY_PROMPT = Prompt(name="summary_prompt", prompt=__SUMMARY_PROMPT)

EXTEND_PROMPT = Prompt(name="extend_summary_prompt", prompt=__EXTEND_SUMMARY)
