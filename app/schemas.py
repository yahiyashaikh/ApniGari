from pydantic import BaseModel, ConfigDict
from typing import Optional

# Shared fields
class VehicleBase(BaseModel):
    brand: str
    model: str
    year: int
    mileage: float
    fuel_type: str
    condition: str
    price: float

class CarCreate(VehicleBase):
    pass

class CarRead(VehicleBase):
    id: int
    model_config = ConfigDict(from_attributes=True)

class BikeCreate(VehicleBase):
    pass

class BikeRead(VehicleBase):
    id: int
    model_config = ConfigDict(from_attributes=True)
