from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from .database import get_db, Base, engine
from . import models
from .schemas import CarCreate, CarRead, BikeCreate, BikeRead

app = FastAPI(title="ApniGari MySQL Backend", version="1.0.0")

# Create tables if they don't exist (simple bootstrapping; for prod use migrations)
Base.metadata.create_all(bind=engine)

@app.get("/health")
def health():
    return {"status": "ok"}

# -----------------------------
# Cars CRUD + Search
# -----------------------------
@app.post("/cars", response_model=CarRead, status_code=201)
def create_car(payload: CarCreate, db: Session = Depends(get_db)):
    car = models.Car(**payload.dict())
    db.add(car)
    db.commit()
    db.refresh(car)
    return car

@app.get("/cars/{car_id}", response_model=CarRead)
def get_car(car_id: int, db: Session = Depends(get_db)):
    car = db.get(models.Car, car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@app.get("/cars", response_model=List[CarRead])
def list_cars(
    db: Session = Depends(get_db),
    brand: Optional[str] = None,
    model: Optional[str] = None,
    min_year: Optional[int] = None,
    max_year: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    q = db.query(models.Car)
    if brand:
        q = q.filter(models.Car.brand.ilike(f"%{brand}%"))
    if model:
        q = q.filter(models.Car.model.ilike(f"%{model}%"))
    if min_year:
        q = q.filter(models.Car.year >= min_year)
    if max_year:
        q = q.filter(models.Car.year <= max_year)
    if min_price:
        q = q.filter(models.Car.price >= min_price)
    if max_price:
        q = q.filter(models.Car.price <= max_price)
    return q.offset(offset).limit(limit).all()

@app.put("/cars/{car_id}", response_model=CarRead)
def update_car(car_id: int, payload: CarCreate, db: Session = Depends(get_db)):
    car = db.get(models.Car, car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    for k, v in payload.dict().items():
        setattr(car, k, v)
    db.commit()
    db.refresh(car)
    return car

@app.delete("/cars/{car_id}", status_code=204)
def delete_car(car_id: int, db: Session = Depends(get_db)):
    car = db.get(models.Car, car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    db.delete(car)
    db.commit()
    return

# -----------------------------
# Bikes CRUD + Search
# -----------------------------
@app.post("/bikes", response_model=BikeRead, status_code=201)
def create_bike(payload: BikeCreate, db: Session = Depends(get_db)):
    bike = models.Bike(**payload.dict())
    db.add(bike)
    db.commit()
    db.refresh(bike)
    return bike

@app.get("/bikes/{bike_id}", response_model=BikeRead)
def get_bike(bike_id: int, db: Session = Depends(get_db)):
    bike = db.get(models.Bike, bike_id)
    if not bike:
        raise HTTPException(status_code=404, detail="Bike not found")
    return bike

@app.get("/bikes", response_model=List[BikeRead])
def list_bikes(
    db: Session = Depends(get_db),
    brand: Optional[str] = None,
    model: Optional[str] = None,
    min_year: Optional[int] = None,
    max_year: Optional[int] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    limit: int = Query(50, ge=1, le=200),
    offset: int = Query(0, ge=0),
):
    q = db.query(models.Bike)
    if brand:
        q = q.filter(models.Bike.brand.ilike(f"%{brand}%"))
    if model:
        q = q.filter(models.Bike.model.ilike(f"%{model}%"))
    if min_year:
        q = q.filter(models.Bike.year >= min_year)
    if max_year:
        q = q.filter(models.Bike.year <= max_year)
    if min_price:
        q = q.filter(models.Bike.price >= min_price)
    if max_price:
        q = q.filter(models.Bike.price <= max_price)
    return q.offset(offset).limit(limit).all()

@app.put("/bikes/{bike_id}", response_model=BikeRead)
def update_bike(bike_id: int, payload: BikeCreate, db: Session = Depends(get_db)):
    bike = db.get(models.Bike, bike_id)
    if not bike:
        raise HTTPException(status_code=404, detail="Bike not found")
    for k, v in payload.dict().items():
        setattr(bike, k, v)
    db.commit()
    db.refresh(bike)
    return bike

@app.delete("/bikes/{bike_id}", status_code=204)
def delete_bike(bike_id: int, db: Session = Depends(get_db)):
    bike = db.get(models.Bike, bike_id)
    if not bike:
        raise HTTPException(status_code=404, detail="Bike not found")
    db.delete(bike)
    db.commit()
    return
