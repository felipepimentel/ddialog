from fastapi import UploadFile

async def process_document(file: UploadFile) -> str:
    # This is a placeholder implementation. You should replace this with actual document processing logic.
    content = await file.read()
    return content.decode("utf-8")