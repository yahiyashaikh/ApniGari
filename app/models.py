from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import Mapped, mapped_column
from .database import Base

class Car(Base):
    __tablename__ = "cars"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    brand: Mapped[str] = mapped_column(String(50), index=True)
    model: Mapped[str] = mapped_column(String(50), index=True)
    year: Mapped[int] = mapped_column(Integer, index=True)
    mileage: Mapped[float] = mapped_column(Float)
    fuel_type: Mapped[str] = mapped_column(String(20))
    condition: Mapped[str] = mapped_column(String(50))
    price: Mapped[float] = mapped_column(Float, index=True)

class Bike(Base):
    __tablename__ = "bikes"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    brand: Mapped[str] = mapped_column(String(50), index=True)
    model: Mapped[str] = mapped_column(String(50), index=True)
    year: Mapped[int] = mapped_column(Integer, index=True)
    mileage: Mapped[float] = mapped_column(Float)
    fuel_type: Mapped[str] = mapped_column(String(20))
    condition: Mapped[str] = mapped_column(String(50))
    price: Mapped[float] = mapped_column(Float, index=True)
