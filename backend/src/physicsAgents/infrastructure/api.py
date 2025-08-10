from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse

from pydantic import BaseModel

from physicsAgents.application.conversation.get_response import (
    get_chat_response,
    get_ws_chat_res,
)

from physicsAgents.domain.physicist_factory import PhysicistFactory

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


@app.websocket("/ws/chat")
async def stream_chat(websocket: WebSocket):
    await websocket.accept()

    # Receive response through ws
    try:
        while True:
            data = await websocket.receive_json()

            if "msg" not in data or "physicist_id" not in data:
                await websocket.send_json(
                    {"error": "Message format invalid. Missing msg and physicist_id."}
                )
                continue
            try:
                physicist_factory = PhysicistFactory()
                physicist = physicist_factory.get_physicist(data["physicist_id"])

                res = get_ws_chat_res(
                    messages=data["msg"],
                    phys_id=data["physicist_id"],
                    phys_name=physicist.name,
                    phys_style=physicist.style,
                )

                await websocket.send_json({"streaming": True})

                msg = ""
                async for text in res:
                    msg += text
                    await websocket.send_json({"chunk": text})

                await websocket.send_json({"response": msg, "streaming": False})

            except Exception as e:
                await websocket.send_json({"error": str(e)})
    except WebSocketDisconnect:
        pass


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")


@app.post("/chat")
async def chat(chat_msg: ChatMsg):
    try:
        res = await get_chat_response(messages=chat_msg.msg)
        return {"response": res}
    except Exception as e:
        # 500 is internal error
        raise HTTPException(status_code=500, detail=str(e))


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <p id='messages'>
        </p>
        <script>
            var ws = new WebSocket("ws://localhost:8000/ws/chat");
            ws.onmessage = function(event) {
                const content = JSON.parse(event.data)
                console.log(JSON.parse(event.data))
                var msgs = document.getElementById('messages')
                if (content.response) {
                    msgs.innerHTML += "<br />"
                }
                if (content.chunk) {
                                    msgs.innerHTML += content.chunk

                }
                //var message = document.createElement('li')
                //var content = document.createTextNode(event.data)
                //message.appendChild(content)
                //messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(JSON.stringify({
                    msg: input.value,
                }))
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


# For testing purposes
@app.get("/")
async def get():
    return HTMLResponse(html)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
