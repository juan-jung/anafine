from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base

class PriceHistory(Base):
    __tablename__ = 'price_history'
    
    price_history_id = Column(BigInteger, primary_key=True, autoincrement=True)
    price_id = Column(BigInteger, ForeignKey('price.price_id'), nullable=False)
    
    cost = Column(Integer, nullable=False)
    significant = Column(String(255))
    created_at = Column(DateTime, nullable=False) #service에서 생성
    is_latest = Column(Boolean, nullable=False, default=True, index=True)

    #Many to One
    price = relationship('Price', back_populates='price_histories', lazy='joined')
