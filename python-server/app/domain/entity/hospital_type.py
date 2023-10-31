from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base

class HospitalType(Base):
    __tablename__ = 'hospital_type'
    
    hospital_type_id = Column(SmallInteger, primary_key=True, autoincrement=True)
    
    name = Column(String(255), nullable=False)
    
    #One to Many
    hospitals = relationship('Hospital', back_populates='hospital_type', lazy='joined')
    