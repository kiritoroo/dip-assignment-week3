import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

from router import dip_router

load_dotenv()

app = FastAPI(
  title='DIP Assignment',
  version='1.1.5'
)

app.include_router(dip_router)

app.add_middleware(
  CORSMiddleware,
  allow_origins=["*"],
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"]
)

@app.get("/", tags=['Root'])
async def root() -> dict:
  """Test API Endpoint"""
  return { "message": "Digital Image Processing"}

if __name__ == "__main__":
  uvicorn.run(
    "main:app",
    host=os.environ.get('DOMAIN'),
    port=int(os.environ.get('PORT')),
    log_level="info",
    reload=True
  )