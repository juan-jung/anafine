from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.schema import Index
from sqlalchemy.orm import relationship
from app.domain import Base

class PriceHistory(Base):
    __tablename__ = 'price_history'
    __table_args__ = (Index('ix_price_id_is_latest', 'price_id', 'is_latest'),)
    price_history_id = Column(BigInteger, primary_key=True, autoincrement=True)
    price_id = Column(BigInteger, ForeignKey('price.price_id'), nullable=False)
    
    cost = Column(Integer, nullable=False)
    significant = Column(String(255))
    info = Column(String(1000))
    created_at = Column(DateTime, nullable=False) #service에서 생성
    is_latest = Column(Boolean, nullable=False, default=True)

    #Many to One
    price = relationship('Price', back_populates='price_histories', lazy='joined')
