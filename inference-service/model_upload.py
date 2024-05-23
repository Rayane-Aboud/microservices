from fastapi import APIRouter, File, UploadFile
import os
import shutil

router = APIRouter()

@router.post("/receive-model")
async def receive_model(file: UploadFile = File(...)):
    if not file.filename.endswith(".pth"):
        return {"error": "Invalid file format. Please upload a PyTorch model file (.pth)"}

    save_directory = "./Prediction_models"
    existing_file_path = os.path.join(save_directory, file.filename)
    if os.path.exists(existing_file_path):
        os.remove(existing_file_path)

    with open(existing_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": f"Model file '{file.filename}' received and saved successfully."}
