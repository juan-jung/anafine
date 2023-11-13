from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.schema import Index
from sqlalchemy.orm import relationship
from app.domain import Base

class Price(Base):
    __tablename__ = 'price'
    __table_args__ = (Index('ix_treatment_id_hospital_id', 'treatment_id', 'hospital_id'),)
    
    price_id = Column(BigInteger, primary_key=True, autoincrement=True)
    treatment_id = Column(String(10), ForeignKey('treatment.treatment_id'), nullable=False)
    hospital_id = Column(Integer, ForeignKey('hospital.hospital_id'), nullable=False)
    
    min_price = Column(Integer, nullable=False, default=2**31-1)
    max_price = Column(Integer, nullable=False, default=0)

    #Many to One
    hospital = relationship('Hospital', back_populates='prices', lazy='joined')
    treatment = relationship('Treatment', back_populates='prices', lazy='joined')
    #One to Many
    price_histories = relationship('PriceHistory', back_populates='price', lazy='joined')
