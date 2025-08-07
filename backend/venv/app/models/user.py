# app/models/user.py

# No ORM like Django here — just use MongoDB documents
def get_user_collection(db):
    return db["users"]
