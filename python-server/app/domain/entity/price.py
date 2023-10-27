from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base

class Price(Base):
    __tablename__ = 'price'
    
    price_id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    treatment_id = Column(String(10), ForeignKey('treatment.treatment_id'))
    hospital_id = Column(Integer, ForeignKey('hospital.hospital_id'))
    
    min_price = Column(Integer, nullable=False, default=2**31-1)
    max_price = Column(Integer, nullable=False, default=0)

    #Many to One
    hospital = relationship('Hospital', back_populates='prices')
    treatment = relationship('Treatment', back_populates='prices')
    #One to Many
    price_histories = relationship('PriceHistory', back_populates='parent_price')