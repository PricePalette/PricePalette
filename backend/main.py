from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Request
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.responses import JSONResponse

from backend.database import MONGO_CLIENT
from widget_app import widget_router
from auth_app import auth_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield
    MONGO_CLIENT.close()


app = FastAPI(lifespan=lifespan, title="Price Palette API docs")
app.include_router(widget_router)
app.include_router(auth_router)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc):
    print(exc)
    return JSONResponse(status_code=422, content={"message": "error"})


@app.exception_handler(HTTPException)
async def validation_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code,
                        content={"message": "error", "details": exc.detail})


@app.get("/")
async def root():
    return {"message": "Ping...pong!"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8081)
