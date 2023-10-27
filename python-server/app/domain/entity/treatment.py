from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base

class Treatment(Base):
    __tablename__ = 'treatment'
    
    treatment_id = Column(String(10), primary_key=True)
    
    category_id = Column(String(10), ForeignKey('category.category_id'))
    
    name = Column(String(255), nullable=False, index=True)
    path = Column(String(255), nullable=False)
    info = Column(String(2000), nullable=True, default=None)
    
    #Many to One
    category = relationship('Category', back_populates='treatments')
    #One to Many
    prices = relationship('Price', back_populates='treatment')
    