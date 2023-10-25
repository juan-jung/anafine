from sqlalchemy import Column, String, BigInteger, Boolean, ForeignKey, DateTime
from app.domain import Base

class Hospital(Base):
    __tablename__ = 'hospital'
    
    hospital_id = Column(BigInteger, primary_key=True, autoincrement=True)
    ykiho = Column(String(255), unique=True, nullable=False, index=True)

