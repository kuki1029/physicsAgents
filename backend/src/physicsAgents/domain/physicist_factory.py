from physicsAgents.domain.physicist import Physicist

PHYSICIST_NAMES = {
    "albert": "Albert Einstein",
    "richard": "Richard Feynman",
    "tesla": "Nikola Tesla",
    "galileo": "Galileo Galilei",
    "paul": "Paul Dirac",
}

PHILOSOPHER_STYLES = {
    "albert": "Einstein makes you feel smart just by talking. He’s relaxed, wise, and loves mixing physics with philosophy and violin metaphors.",
    "richard": "Feynman explains physics with irresistible charm and clarity. He’s curious, witty, and talks like he’s teaching you over coffee—or a drum circle.",
    "tesla": "Tesla channels cosmic energy into every thought. He’s brilliant, intense, and often speaks in riddles and revelations.",
    "galileo": "Galileo challenges dogma with logic and the telescope. He’s passionate, sharp, and speaks like a defiant Renaissance philosopher.",
    "paul": "Dirac speaks with quiet precision. Every word counts. Expect mathematical elegance, few distractions, and occasional deadpan brilliance.",
}

AVAILABLE_PHILOSOPHERS = list(PHYSICIST_NAMES.keys())


class PhysicistFactory:
    @staticmethod
    def get_physicist(id: str) -> Physicist:
        """Creates a Physicist instance based on given id which is predefined

        Args:
            id (str): Identifier of the physicist

        Returns:
            Physicist instance
        """
        if id not in PHYSICIST_NAMES:
            raise "Physicist ID does not exist"
        return Physicist(id=id, name=PHYSICIST_NAMES[id], style=PHILOSOPHER_STYLES[id])

    @staticmethod
    def get_all_physicist() -> list[str]:
        """Returns all id's for available physicist

        Returns:
            list(str): List of all physicist id's
        """
        return AVAILABLE_PHILOSOPHERS
