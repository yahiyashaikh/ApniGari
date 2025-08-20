"""Run this once to create the database tables if not created automatically."""
from app.database import Base, engine
from app import models

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Tables created.")
