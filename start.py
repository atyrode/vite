from src.api import app
import uvicorn

if __name__ == "__main__":

    # Start the FastAPI server
    uvicorn.run("src.api:app", host="0.0.0.0", port=8080, reload=True)