from sqlalchemy import Column, DECIMAL, Double, String, BigInteger, Integer, SmallInteger, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app.domain import Base

class Category(Base):
    __tablename__ = 'category'
    
    category_id = Column(String(10), primary_key=True)
    parent_category_id = Column(String(10), ForeignKey('category.category_id'), nullable=True, default=None)
    name = Column(String(255), nullable=False)
    info = Column(String(2000), nullable=True, default=None)
    isleaf = Column(Boolean, nullable=False, default=True)
    
    #Many to One
    parent_category = relationship('Category', remote_side=[category_id], back_populates='sub_categories')
    #One to Many
    treatments = relationship('Treatment', back_populates='category')
    sub_categories = relationship('Category', remote_side=[parent_category_id], back_populates='parent_category')