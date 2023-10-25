from sqlalchemy import Column, String, BigInteger, Boolean, ForeignKey, DateTime
from app.domain import Base

from app.domain import Base

class PriceHistory(Base):
    __tablename__ = 'price_history'
    
    price_history_id = Column(BigInteger, primary_key=True, autoincrement=True)
    price_id = Column(BigInteger, ForeignKey('price.price_id'))
    price = Column(BigInteger, nullable=False)
    created_at = Column(DateTime, nullable=False)
    is_latest = Column(Boolean, nullable=False, default=True, index=True)

