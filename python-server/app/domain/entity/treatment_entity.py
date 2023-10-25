from sqlalchemy import Column, String, BigInteger, Boolean, ForeignKey, DateTime
from app.domain import Base

from app.domain import Base

class Treatment(Base):
    __tablename__ = 'treatment'
    
    treatment_id = Column(String(10), primary_key=True)

