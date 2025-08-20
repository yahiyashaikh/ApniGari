# ApniGari — FastAPI + MySQL Backend (Cars & Bikes)

## 1) Setup
```bash
python -m venv venv
# Windows: .\venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

pip install -r requirements.txt
```

## 2) Configure DB
Copy `.env.example` to `.env` and set credentials:
```
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=apnigari
```

Create the database in MySQL:
```sql
CREATE DATABASE apnigari CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

## 3) Create Tables
Either run the app (it auto-creates) or run:
```bash
python create_tables.py
```

## 4) Run
```bash
uvicorn app.main:app --reload
```
Open Swagger UI: http://127.0.0.1:8000/docs

## 5) Example Requests

### Create Car
POST `/cars`
```json
{
  "brand": "Maruti",
  "model": "Swift",
  "year": 2018,
  "mileage": 42000,
  "fuel_type": "Petrol",
  "condition": "Good",
  "price": 350000
}
```

### Search Cars
GET `/cars?brand=maruti&min_year=2015&max_price=500000&limit=20&offset=0`

### Create Bike
POST `/bikes`
```json
{
  "brand": "Honda",
  "model": "Shine",
  "year": 2019,
  "mileage": 30000,
  "fuel_type": "Petrol",
  "condition": "Good",
  "price": 65000
}
```

### Search Bikes
GET `/bikes?brand=honda&min_year=2015&max_price=90000`
```

## 6) Notes
- Uses SQLAlchemy 2.0 style models.
- Replace auto-create with migrations (Alembic) for production.
- Hook your ML price prediction inside POST routes before saving if needed.
