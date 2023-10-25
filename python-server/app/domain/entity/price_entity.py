from sqlalchemy import Column, String, BigInteger, Boolean, ForeignKey, DateTime
from app.domain import Base

class Price(Base):
    __tablename__ = 'price'
    
    price_id = Column(BigInteger, primary_key=True, autoincrement=True)
    treatment_id = Column(String(10), ForeignKey('treatment.treatment_id'))
    hospital_id = Column(BigInteger, ForeignKey('hospital.hospital_id'))
    min_price = Column(BigInteger, nullable=False, default=2**63-1)
    max_price = Column(BigInteger, nullable=False, default=0)

