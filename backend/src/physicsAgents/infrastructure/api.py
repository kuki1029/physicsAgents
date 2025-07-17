from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

from physicsAgents.application.conversation.get_response import get_chat_response

app = FastAPI()

# TODO Block this to specific frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/ping")
async def ping():
    return {"response": "Hello World"}


class ChatMsg(BaseModel):
    msg: str


@app.post("/chat")
async def chat(chat_msg: ChatMsg):
    try:
        res = await get_chat_response(messages=chat_msg.msg)
        print(res)
        return {"response", res}
    except Exception as e:
        # 500 is internal error
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
