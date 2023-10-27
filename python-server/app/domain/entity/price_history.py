from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base

class PriceHistory(Base):
    __tablename__ = 'price_history'
    
    price_history_id = Column(BigInteger, primary_key=True, autoincrement=True)
    
    price_id = Column(BigInteger, ForeignKey('price.price_id'))
    
    price = Column(Integer, nullable=False)
    significant = Column(String(255), nullable=True, default=None)
    created_at = Column(DateTime, nullable=False)
    is_latest = Column(Boolean, nullable=False, default=True, index=True)

    #Many to One
    parent_price = relationship('Price', back_populates='price_histories')
