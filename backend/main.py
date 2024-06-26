from contextlib import asynccontextmanager

import uvicorn
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import SQLAlchemyError

from backend.database import MONGO_CLIENT, ALCHEMY_ENGINE
from backend.database_models import create_tables
from backend.embed_app import embed_router
from backend.widget_app import widget_router
from backend.user_app import user_router
from backend.templates_app import templates_router
from backend.subscription_app import sub_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    MONGO_CLIENT.admin.command('ping')
    create_tables()
    yield
    MONGO_CLIENT.close()
    ALCHEMY_ENGINE.dispose()


app = FastAPI(lifespan=lifespan, title="Price Palette API docs")
app.include_router(widget_router)
app.include_router(user_router)
app.include_router(templates_router)
app.include_router(sub_router)
app.include_router(embed_router)

origins = ["*"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    err_msg = "; ".join([f'{err["msg"]}: {err["loc"][-1]}' if err["type"] == "missing" else err["msg"]
                         for err in exc.errors()])
    return JSONResponse(status_code=422, content={"message": "error", "detail": err_msg})


@app.exception_handler(HTTPException)
async def validation_exception_handler(request, exc):
    return JSONResponse(status_code=exc.status_code,
                        content={"message": "error", "details": exc.detail})


@app.exception_handler(SQLAlchemyError)
async def validation_exception_handler(request, exc):
    return JSONResponse(status_code=500,
                        content={"message": "error", "details": exc.orig.args[1]})


@app.get("/")
async def root():
    return {"message": "Ping...pong!"}


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8081)
